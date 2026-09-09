'use server'

import { errorAction, successAction } from '@/lib/action-result'
import prisma from '@/lib/prisma'

interface GetRemindersProps {
    userId: string
}

export async function getReminders({ userId }: GetRemindersProps) {
    if (!userId) {
        return errorAction('Falha ao buscar lembretes.')
    }

    try {
        const reminders = await prisma.reminder.findMany({
            where: {
                userId,
            },
        })

        return successAction(reminders)
    } catch (error) {
        console.error(error)

        return errorAction('Falha ao buscar lembretes.')
    }
}
