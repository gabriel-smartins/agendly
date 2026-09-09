import { getReminders } from '../../_data-access/get-reminders'
import { ReminderList } from './reminder-list'

interface RemindersProps {
    userId: string
}

export async function Reminders({ userId }: RemindersProps) {
    const result = await getReminders({ userId })

    return <ReminderList reminder={result.success ? result.data : []} />
}
