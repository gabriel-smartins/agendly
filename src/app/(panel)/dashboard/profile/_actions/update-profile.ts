'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { errorAction, successAction } from '@/lib/action-result'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

const updateSchema = z.object({
    name: z.string().min(1, { message: 'O nome é obrigatório.' }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.boolean(),
    timezone: z.string().min(1, { message: 'O fuso-horário é obrigatório.' }),
    times: z.array(z.string()),
})

type UpdateSchema = z.infer<typeof updateSchema>

export async function updateProfile(updateData: UpdateSchema) {
    const session = await auth()

    if (!session?.user?.id) {
        return errorAction('Usuário não autenticado.')
    }

    const schema = updateSchema.safeParse(updateData)

    if (!schema.success) {
        return errorAction('Preencha todos os campos corretamente.')
    }

    try {
        await prisma.user.update({
            where: {
                id: session?.user?.id,
            },
            data: {
                name: updateData.name,
                address: updateData.address,
                phone: updateData.phone,
                status: updateData.status,
                timezone: updateData.timezone,
                times: updateData.times || [],
            },
        })

        revalidatePath('/dashboard/profile')

        return successAction('Dados atualizados com sucesso!')
    } catch (error) {
        console.error(error)

        return errorAction('Falha ao atualizar dados.')
    }
}
