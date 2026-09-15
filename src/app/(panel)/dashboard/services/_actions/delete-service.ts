'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { errorAction, successAction } from '@/lib/action-result'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

const formSchema = z.object({
    serviceId: z.string().min(1, { message: 'O id do serviço é obrigatório.' }),
})

type FormSchema = z.infer<typeof formSchema>

export async function deleteService(formData: FormSchema) {
    const session = await auth()

    if (!session?.user?.id) {
        return errorAction('Falha ao deletar serviço')
    }

    const schema = formSchema.safeParse(formData)

    if (!schema.success) {
        return errorAction(schema.error.issues[0].message)
    }

    try {
        await prisma.service.update({
            where: {
                id: formData.serviceId,
                userId: session?.user?.id,
            },
            data: {
                status: false,
            },
        })

        revalidatePath('/dashboard/services')

        return successAction('Serviço deletado com sucesso!')
    } catch (error) {
        console.error(error)

        return errorAction('Falha ao deletar serviço')
    }
}
