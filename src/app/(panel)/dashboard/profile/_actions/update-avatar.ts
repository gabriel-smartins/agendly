'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface UpdateAvatarProps {
    avatarUrl: string
}

export async function updateAvatar({ avatarUrl }: UpdateAvatarProps) {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
        return {
            error: 'Usuário não encontrado.',
        }
    }

    if (!avatarUrl) {
        return { error: 'Falha ao alterar imagem.' }
    }

    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                image: avatarUrl,
            },
        })

        revalidatePath('/dashboard/profile')

        return {
            data: 'Imagem alterada com sucesso!',
        }
    } catch (error) {
        console.error(error)

        return { error: 'Falha ao alterar imagem.' }
    }
}
