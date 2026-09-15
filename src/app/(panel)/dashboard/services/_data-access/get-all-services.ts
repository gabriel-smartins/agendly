'use server'

import { errorAction, successAction } from '@/lib/action-result'
import prisma from '@/lib/prisma'

export async function getAllServices({ userId }: { userId: string }) {
    if (!userId) {
        return errorAction('O ID do usuário não foi fornecido.')
    }

    try {
        const services = await prisma.service.findMany({
            where: {
                userId,
                status: true,
            },
        })

        return successAction(services)
    } catch (error) {
        console.error(error)
        return errorAction('Falha ao buscar serviços.')
    }
}
