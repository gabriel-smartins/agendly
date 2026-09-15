import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Plan } from '@/generated/prisma/enums'
import { errorAction } from '@/lib/action-result'
import { manageSub } from '@/utils/manage-sub'
import { stripe } from '@/utils/stripe'

export async function POST(request: Request) {
    const sign = request.headers.get('stripe-signature')

    if (!sign) {
        return NextResponse.json(
            errorAction('Stripe signature não informado.'),
            {
                status: 400,
            }
        )
    }

    const text = await request.text()

    const event = stripe.webhooks.constructEvent(
        text,
        sign,
        process.env.STRIPE_SECRET_WEBHOOK_KEY as string
    )

    switch (event.type) {
        case 'customer.subscription.deleted':
            const payment = event.data.object as Stripe.Subscription
            await manageSub({
                subscriptionId: payment.id,
                customerId: payment.customer.toString(),
                createAction: false,
                deleteAction: true,
            })

            break
        case 'customer.subscription.updated':
            const paymentIntent = event.data.object as Stripe.Subscription
            await manageSub({
                subscriptionId: paymentIntent.id,
                customerId: paymentIntent.customer.toString(),
                createAction: false,
                deleteAction: false,
            })

            break

        case 'checkout.session.completed':
            const checkout = event.data.object as Stripe.Checkout.Session
            const type = checkout?.metadata?.type
                ? checkout?.metadata?.type
                : 'BASIC'

            if (checkout.subscription && checkout.customer) {
                await manageSub({
                    subscriptionId: checkout.subscription.toString(),
                    customerId: checkout.customer.toString(),
                    createAction: true,
                    deleteAction: false,
                    plan: type as Plan,
                })
            }

            break

        default:
            console.log('Evento não tratado: ', event.type)
    }

    revalidatePath('/dashboard/plans')

    return NextResponse.json({ received: true })
}
