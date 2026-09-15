import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Plan } from '@/generated/prisma/enums'
import { errorAction } from '@/lib/action-result'
import prisma from '@/lib/prisma'
import { stripe } from '@/utils/stripe'

/**
 * Salvar, atualizar ou deletar assinaturas no banco de dados, sincronizando com o Stripe
 *
 */

interface ManageSubParams {
    subscriptionId: string
    customerId: string
    createAction: boolean
    deleteAction: boolean
    plan?: Plan
}

export async function manageSub({
    subscriptionId,
    customerId,
    createAction = false,
    deleteAction = false,
    plan,
}: ManageSubParams) {
    const user = await prisma.user.findFirst({
        where: {
            stripe_customer_id: customerId,
        },
    })

    if (!user) {
        return NextResponse.json(errorAction('Falha ao realizar assinatura.'), {
            status: 400,
        })
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    if (subscriptionId && deleteAction) {
        await prisma.subscription.delete({
            where: {
                id: subscriptionId,
            },
        })

        return
    }

    if (createAction) {
        try {
            await prisma.subscription.create({
                data: {
                    id: subscription.id,
                    userId: user.id,
                    status: subscription.status,
                    priceId: subscription.items.data[0].price.id,
                    plan: plan ?? 'BASIC',
                },
            })
        } catch (error) {
            console.error(error)

            return NextResponse.json(
                errorAction('Falha ao salvar assinatura.'),
                {
                    status: 400,
                }
            )
        }
    } else {
        try {
            const subscriptionFounded = await prisma.subscription.findFirst({
                where: {
                    id: subscriptionId,
                },
            })

            if (!subscriptionFounded) {
                return
            }

            await prisma.subscription.update({
                where: {
                    id: subscriptionFounded.id,
                },
                data: {
                    status: subscription.status,
                    priceId: subscription.items.data[0].price.id,
                },
            })
        } catch (error) {
            console.error(error)

            return NextResponse.json(
                errorAction('Falha ao atualizar assinatura.'),
                {
                    status: 400,
                }
            )
        }
    }
}
