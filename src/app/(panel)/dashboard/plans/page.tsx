import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'
import { PlansDisplay } from './_components/plans-display'
import { SubscriptionDetail } from './_components/subscription-detail'
import { getSubscription } from './_data-access/get-subscription'

export default async function Plans() {
    const session = await getSession()

    if (!session) {
        redirect('/')
    }

    const subs = await getSubscription({ userId: session?.user?.id! })

    return (
        <div className="flex flex-col min-h-screen">
            {subs?.status !== 'active' && <PlansDisplay />}
            {subs?.status === 'active' && (
                <SubscriptionDetail subscription={subs!} />
            )}
        </div>
    )
}
