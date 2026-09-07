import { redirect } from 'next/navigation'
import { ScheduleContent } from './_components/schedule.content'
import { getInfoSchedule } from './_data-access/get-info-schedule'

export default async function SchedulePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const userId = (await params).id
    const user = await getInfoSchedule({ userId })

    if (!user?.data) {
        redirect('/')
    }

    return (
        <div>
            <ScheduleContent clinic={user.data} />
        </div>
    )
}
