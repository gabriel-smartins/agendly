'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { errorAction, successAction } from '@/lib/action-result'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

const formSchema = z.object({
    name: z.string().min(1, { message: 'O nome do serviço é obrigatório.' }),
    price: z.number().min(1, { message: 'Informe um valor para o serviço.' }),
    duration: z.number(),
})

type FormSchema = z.infer<typeof formSchema>

export async function createNewService(formData: FormSchema) {
    const session = await auth()

    if (!session?.user?.id) {
        return errorAction('Usuário não autenticado.')
    }

    const schema = formSchema.safeParse(formData)

    if (!schema.success) {
        return errorAction(schema.error.issues[0].message)
    }

    try {
        const newService = await prisma.service.create({
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration,
                userId: session?.user?.id,
            },
        })

        revalidatePath('/dashboard/services')

        return successAction(newService)
    } catch (error) {
        console.error(error)
        return errorAction('Falha ao cadastrar serviço.')
    }
}
