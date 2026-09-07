'use server'

import prisma from '@/lib/prisma'

interface GetRemindersProps {
    userId: string
}

export async function getReminders({ userId }: GetRemindersProps) {
    if (!userId) {
        return []
    }

    try {
        const reminders = await prisma.reminder.findMany({
            where: {
                userId,
            },
        })

        return reminders
    } catch (error) {
        console.error(error)

        return []
    }
}
