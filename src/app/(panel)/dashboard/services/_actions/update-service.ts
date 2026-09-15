'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { errorAction, successAction } from '@/lib/action-result'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

const formSchema = z.object({
    serviceId: z.string().min(1, { message: 'O id do serviço é obrigatório.' }),
    name: z.string().min(1, { message: 'O nome do serviço é obrigatório.' }),
    price: z.number().min(1, { message: 'Informe um valor para o serviço.' }),
    duration: z.number(),
})

type FormSchema = z.infer<typeof formSchema>

export async function updateService(formData: FormSchema) {
    const session = await auth()

    if (!session?.user?.id) {
        return errorAction('Falha ao atualizar serviço')
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
                name: formData.name,
                price: formData.price,
                duration: formData.duration < 30 ? 30 : formData.duration,
            },
        })

        revalidatePath('/dashboard/services')

        return successAction('Serviço atualizado com sucesso!')
    } catch (error) {
        console.error(error)

        return errorAction('Falha ao atualizar serviço')
    }
}
