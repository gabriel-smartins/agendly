import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import getSession from '@/lib/getSession'
import { ServiceContent } from './_components/service-content'
import { ServicesSkeleton } from './_components/services-skeleton'

export default async function Services() {
    const session = await getSession()

    if (!session) {
        redirect('/')
    }

    return (
        <Suspense fallback={<ServicesSkeleton />}>
            <ServiceContent userId={session?.user?.id!} />
        </Suspense>
    )
}
