'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
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
    const schema = formSchema.safeParse(formData)

    if (!schema.success) {
        return {
            error: schema.error.issues[0].message,
        }
    }

    try {
        await prisma.reminder.delete({
            where: {
                id: formData.reminderId,
            },
        })

        revalidatePath('/dashboard')

        return {
            data: 'Lembrete deletado com sucesso!',
        }
    } catch (error) {
        console.error(error)

        return {
            error: 'Falha ao deletar lembrete.',
        }
    }
}
