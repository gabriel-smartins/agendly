'use server'

import { errorAction, successAction } from '@/lib/action-result'
import prisma from '@/lib/prisma'

interface GetTimesProps {
    userId: string
}

export async function getTimesClinic({ userId }: GetTimesProps) {
    if (!userId) {
        return errorAction('O ID do usuário não foi fornecido.')
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
            return errorAction(`Usuário com o id: ${userId} não encontrado.`)
        }

        return successAction({
            times: user.times,
            userId: user.id,
        })
    } catch (error) {
        console.error(error)

        return errorAction(
            'Ocorreu um erro interno ao buscar os horários. Tente novamente.'
        )
    }
}
