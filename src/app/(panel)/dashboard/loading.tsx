import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSkeleton } from './_components/dashboard-skeleton'

export default function DashboardLoading() {
    return (
        <div className="animate-in fade-in-50 duration-300">
            <div className="flex items-center justify-end gap-2">
                <Skeleton className="h-10 w-44" />
                <Skeleton className="h-10 w-10" />
            </div>
            <DashboardSkeleton />
        </div>
    )
}
