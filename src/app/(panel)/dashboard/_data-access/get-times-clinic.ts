'use server'

import prisma from '@/lib/prisma'

interface GetTimesProps {
    userId: string
}

export async function getTimesClinic({ userId }: GetTimesProps) {
    if (!userId) {
        return {
            times: [],
            error: 'O ID do usuário não foi fornecido.',
        }
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                id: true,
                times: true,
            },
        })

        if (!user) {
            return {
                times: [],
                error: `Usuário com o id: ${userId} não encontrado.`,
            }
        }

        return {
            times: user.times,
            userId: user.id,
        }
    } catch (error) {
        console.error(error)

        return {
            times: [],
            error: 'Ocorreu um erro interno ao buscar os horários. Tente novamente.',
        }
    }
}
