'use server'

import prisma from '@/lib/prisma'

export async function getSubscription({ userId }: { userId: string }) {
    if (!userId) {
        return null
    }

    try {
        const subs = await prisma.subscription.findFirst({
            where: {
                userId,
            },
        })

        return subs
    } catch (error) {
        console.error(error)

        return null
    }
}
