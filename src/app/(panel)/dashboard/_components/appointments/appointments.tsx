import { getTimesClinic } from '../../_data-access/get-times-clinic'
import { AppointmentsList } from './appointments-list'

interface AppointmentsProps {
    userId: string
}

export async function Appointments({ userId }: AppointmentsProps) {
    const result = await getTimesClinic({ userId })

    return (
        <div>
            <AppointmentsList times={result.success ? result.data.times : []} />
        </div>
    )
}
