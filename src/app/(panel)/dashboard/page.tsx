import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import getSession from '@/lib/getSession'
import { Appointments } from './_components/appointments/appointments'
import { ButtonCopyLink } from './_components/button-copy-link'
import { Reminders } from './_components/reminder/reminders'

function DashboardSkeleton() {
    return (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-4">
            <div className="rounded-xl border bg-card p-4 space-y-4">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
            </div>

            <div className="rounded-xl border bg-card p-4 space-y-4">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
            </div>
        </section>
    )
}

export default async function Dashboard() {
    const session = await getSession()

    if (!session) {
        redirect('/')
    }

    return (
        <div>
            <main>
                <div className="gap-2 flex items-center justify-end">
                    <Link
                        href={`/scheduling/${session.user?.id!}`}
                        target="_blank"
                    >
                        <Button className="bg-emerald-500 hover:bg-emerald-400 text-white flex-1 md:flex[0]">
                            <Calendar className="w-5 h-5" />
                            <span>Novo agendamento</span>
                        </Button>
                    </Link>
                    <ButtonCopyLink userId={session.user?.id!} />
                </div>

                <Suspense fallback={<DashboardSkeleton />}>
                    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-4">
                        <Appointments userId={session.user?.id} />

                        <Reminders userId={session.user?.id!} />
                    </section>
                </Suspense>
            </main>
        </div>
    )
}
