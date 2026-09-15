'use server'

import { errorAction, successAction } from '@/lib/action-result' // Importe aqui
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { stripe } from '@/utils/stripe'

export async function createCustomerPortal() {
    const session = await auth()

    if (!session?.user?.id) {
        return errorAction('Usuário não autenticado.')
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
    })

    if (!user) {
        return errorAction('Usuário não encontrado no banco de dados.')
    }

    const customerId = user.stripe_customer_id

    if (!customerId) {
        return errorAction('Nenhuma assinatura encontrada para este usuário.')
    }

    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: process.env.STRIPE_SUCCESS_URL as string,
        })

        return successAction({ portalUrl: portalSession.url })
    } catch (error) {
        console.error('Erro na API do Stripe:', error)
        return errorAction(
            'Não foi possível gerar o link de cobrança no momento.'
        )
    }
}
