'use server'

import { errorAction, successAction } from '@/lib/action-result'
import prisma from '@/lib/prisma'

interface GetInfoScheduleProps {
    userId: string
}

export async function getInfoSchedule({ userId }: GetInfoScheduleProps) {
    try {
        if (!userId) {
            return errorAction('Usuário não encontrado.')
        }

        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
            include: {
                subscription: true,
                services: {
                    where: {
                        status: true,
                    },
                },
            },
        })

        if (!user) {
            return errorAction('Usuário não encontrado.')
        }

        return successAction(user)
    } catch (error) {
        console.error(error)
        return errorAction('Falha ao buscar usuário.')
    }
}
