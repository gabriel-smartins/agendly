import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { LabelSubscription } from '@/components/ui/label-subscription'
import getSession from '@/lib/getSession'
import { checkSubscription } from '@/utils/permissions/checkSubscription'
import { Appointments } from './_components/appointments/appointments'
import { ButtonCopyLink } from './_components/button-copy-link'
import { DashboardSkeleton } from './_components/dashboard-skeleton'
import { Reminders } from './_components/reminder/reminders'

export default async function Dashboard() {
    const session = await getSession()

    if (!session) {
        redirect('/')
    }

    const subscription = await checkSubscription(session?.user?.id!)

    return (
        <div>
            <main>
                <div className="flex items-center justify-end gap-2">
                    <Link
                        href={`/scheduling/${session.user?.id!}`}
                        target="_blank"
                    >
                        <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700 md:flex-[0]">
                            <Calendar className="h-5 w-5" />
                            <span>Novo agendamento</span>
                        </Button>
                    </Link>
                    <ButtonCopyLink userId={session.user?.id!} />
                </div>
                {subscription?.subscriptionStatus === 'EXPIRED' && (
                    <LabelSubscription expired={true} />
                )}

                {subscription?.subscriptionStatus === 'TRIAL' && (
                    <div className="bg-emerald-600 text-white text-sm md:text-base px-3 py-2 my-2 rounded-md">
                        <p className="font-semibold">{subscription?.message}</p>
                    </div>
                )}

                {subscription?.subscriptionStatus !== 'EXPIRED' && (
                    <Suspense fallback={<DashboardSkeleton />}>
                        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-4">
                            <Appointments userId={session.user?.id} />

                            <Reminders userId={session.user?.id!} />
                        </section>
                    </Suspense>
                )}
            </main>
        </div>
    )
}
