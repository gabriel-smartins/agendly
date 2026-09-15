import { Skeleton } from '@/components/ui/skeleton'

interface AppointmentsSkeletonProps {
    rows?: number
}

export function AppointmentsSkeleton({ rows = 6 }: AppointmentsSkeletonProps) {
    return (
        <>
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center border-t py-2 last:border-b"
                >
                    <Skeleton className="mr-3 h-4 w-14" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="ml-4 h-8 w-8 rounded-md" />
                </div>
            ))}
        </>
    )
}
