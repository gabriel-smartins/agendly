'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { errorAction, successAction } from '@/lib/action-result'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

const formSchema = z.object({
    reminderId: z
        .string({
            errorMap: () => ({ message: 'O id do lembrete é obrigatório.' }),
        })
        .min(1, { message: 'O id do lembrete é obrigatório.' }),
})

type FormSchema = z.infer<typeof formSchema>

export async function deleteReminder(formData: FormSchema) {
    const session = await auth()

    if (!session?.user?.id) {
        return errorAction('Usuário não autenticado.')
    }

    const schema = formSchema.safeParse(formData)

    if (!schema.success) {
        return errorAction(schema.error.issues[0].message)
    }

    try {
        await prisma.reminder.delete({
            where: {
                id: formData.reminderId,
            },
        })

        revalidatePath('/dashboard')

        return successAction('Lembrete deletado com sucesso!')
    } catch (error) {
        console.error(error)

        return errorAction('Falha ao deletar lembrete.')
    }
}
