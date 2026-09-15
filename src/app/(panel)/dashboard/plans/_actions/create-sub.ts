'use server'

import { Plan } from '@/generated/prisma/enums'
import { errorAction } from '@/lib/action-result'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { stripe } from '@/utils/stripe'

interface SubProps {
    plan: Plan
}

export async function createSub({ plan }: SubProps) {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
        return {
            error: errorAction('Falha ao ativar plano.'),
        }
    }

    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    })

    if (!user) {
        return {
            error: errorAction('Usuário não encontrado.'),
        }
    }

    let customerId = user.stripe_customer_id

    if (!customerId) {
        const newStripeCustomer = await stripe.customers.create({
            email: user.email,
        })

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                stripe_customer_id: newStripeCustomer.id,
            },
        })

        customerId = newStripeCustomer.id
    }

    try {
        const stripeCheckout = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                {
                    price:
                        plan === 'BASIC'
                            ? process.env.STRIPE_BASIC
                            : process.env.STRIPE_PRO,
                    quantity: 1,
                },
            ],
            metadata: {
                type: plan,
            },
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
        })

        return {
            sessionId: stripeCheckout.id,
            url: stripeCheckout.url,
        }
    } catch (error) {
        console.error(error)

        return {
            error: errorAction('Falha ao ativar plano.'),
        }
    }
}
