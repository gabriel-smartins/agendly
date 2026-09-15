'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { errorAction, successAction } from '@/lib/action-result'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

const formSchema = z.object({
    appointmentId: z
        .string()
        .min(1, { message: 'O id do agendamento é obrigatório.' }),
})

type FormSchema = z.infer<typeof formSchema>

export async function cancelAppointment(formData: FormSchema) {
    const session = await auth()

    if (!session?.user?.id) {
        return errorAction('Usuário não autenticado.')
    }

    const schema = formSchema.safeParse(formData)

    if (!schema.success) {
        return errorAction(schema.error.issues[0].message)
    }

    try {
        await prisma.appointment.delete({
            where: {
                id: formData.appointmentId,
                userId: session?.user?.id,
            },
        })

        revalidatePath('/dashboard')

        return successAction('Agendamento cancelado com sucesso!')
    } catch (error) {
        console.error(error)

        return errorAction('Falha ao cancelar agendamento.')
    }
}
