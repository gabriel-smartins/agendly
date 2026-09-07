import { getReminders } from '../../_data-access/get-reminders'
import { ReminderList } from './reminder-list'

interface RemindersProps {
    userId: string
}

export async function Reminders({ userId }: RemindersProps) {
    const reminders = await getReminders({ userId })

    return <ReminderList reminder={reminders} />
}
