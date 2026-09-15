import { Skeleton } from '@/components/ui/skeleton'

export function ServicesSkeleton() {
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-9 w-36" />
                <Skeleton className="h-10 w-10 rounded-md" />
            </div>

            <div className="space-y-3 rounded-xl border bg-card p-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </section>
    )
}
