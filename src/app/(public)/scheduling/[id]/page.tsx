import { redirect } from 'next/navigation'
import { ScheduleContent } from './_components/schedule.content'
import { getInfoSchedule } from './_data-access/get-info-schedule'

export default async function SchedulePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const userId = (await params).id
    const result = await getInfoSchedule({ userId })

    if (!result.success || !result.data) {
        redirect('/')
    }

    return (
        <div>
            <ScheduleContent clinic={result.data} />
        </div>
    )
}
