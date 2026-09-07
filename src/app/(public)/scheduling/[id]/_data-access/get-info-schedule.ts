'use server'

import prisma from '@/lib/prisma'

interface GetInfoScheduleProps {
    userId: string
}

export async function getInfoSchedule({ userId }: GetInfoScheduleProps) {
    try {
        if (!userId) {
            return null
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
            return null
        }

        return {
            data: user,
        }
    } catch (error) {
        console.error(error)
        return {
            error: 'Erro ao buscar usuário.',
        }
    }
}
