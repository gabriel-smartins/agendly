import { getProfileTimes } from '../../_data-access/get-profile-times'
import { AppointmentsList } from './appointments-list'

interface AppointmentsProps {
    userId: string
}

export async function Appointments({ userId }: AppointmentsProps) {
    const result = await getProfileTimes({ userId })

    return (
        <div>
            <AppointmentsList times={result.success ? result.data.times : []} />
        </div>
    )
}
