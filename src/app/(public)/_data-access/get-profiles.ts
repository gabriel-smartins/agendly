'use server'

import { errorAction, successAction } from '@/lib/action-result'
import prisma from '@/lib/prisma'

export async function getProfiles() {
    try {
        const profiles = await prisma.user.findMany({
            where: {
                status: true,
            },
        })

        return successAction(profiles)
    } catch (error) {
        console.error(error)

        return errorAction('Falha ao buscar perfis.')
    }
}
