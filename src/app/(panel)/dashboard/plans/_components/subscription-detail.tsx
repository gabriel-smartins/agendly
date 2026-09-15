'use client'

import { Loader } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Subscription } from '@/generated/prisma/client'
import { subscriptionPlans } from '@/utils/plans'
import { createCustomerPortal } from '../_actions/create-customer-portal'

interface SubscriptionDetailProps {
    subscription: Subscription
}

export function SubscriptionDetail({ subscription }: SubscriptionDetailProps) {
    const [isLoading, setIsLoading] = useState(false)
    const subscriptionsInfo = subscriptionPlans.find(
        (plan) => plan.id === subscription.plan
    )

    async function handleManageSubscription() {
        setIsLoading(true)

        try {
            const response = await createCustomerPortal()

            if (!response.success) {
                toast.error(response.error)
                return
            }

            window.location.href = response.data.portalUrl
        } catch (error) {
            toast.error('Ocorreu um erro inesperado ao conectar ao servidor.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Plano atual</CardTitle>
                <CardDescription>Sua assinatura está ativa</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg md:text-xl">
                        {subscription.plan === 'BASIC'
                            ? 'BASIC'
                            : 'PROFISSIONAL'}
                    </h3>

                    <div className="bg-green-500 text-white w-fit px-4 py-1 rounded-md">
                        {subscription.status === 'active'
                            ? 'ATIVO '
                            : 'INATIVO'}
                    </div>
                </div>

                <ul className="list-disc list-inside space-y-2">
                    {subscriptionsInfo &&
                        subscriptionsInfo.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                        ))}
                </ul>
            </CardContent>

            <CardFooter>
                <Button
                    className="bg-black text-white hover:bg-gray-700"
                    onClick={handleManageSubscription}
                    disabled={isLoading}
                >
                    {isLoading && (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading
                        ? 'Abrindo assinatura...'
                        : 'Gerenciar assinatura'}
                </Button>
            </CardFooter>
        </Card>
    )
}
