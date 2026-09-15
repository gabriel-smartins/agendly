import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
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
