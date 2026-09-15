'use server'

import { z } from 'zod'
import { errorAction, successAction } from '@/lib/action-result'
import prisma from '@/lib/prisma'

const formSchema = z.object({
    name: z.string().min(1, { message: 'O nome é obrigatório.' }),
    email: z.string().email({ message: 'O email é obrigatório.' }),
    phone: z.string().min(1, { message: 'O telefone é obrigatório.' }),
    date: z.date(),
    serviceId: z.string().min(1, { message: 'O serviço é obrigatório.' }),
    time: z.string().min(1, { message: 'O horário é obrigatório.' }),
    profileId: z.string().min(1, { message: 'O usuário é obrigatório.' }),
})

type FormSchema = z.infer<typeof formSchema>

export async function createNewAppointment(formData: FormSchema) {
    const schema = formSchema.safeParse(formData)

    if (!schema.success) {
        return errorAction(schema.error.issues[0].message)
    }

    try {
        const selectedDate = new Date(formData.date)
        const year = selectedDate.getFullYear()
        const month = selectedDate.getMonth()
        const day = selectedDate.getDate()

        const appointmentDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0))
        const newAppointment = await prisma.appointment.create({
            data: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                time: formData.time,
                appointementDate: appointmentDate,
                serviceId: formData.serviceId,
                userId: formData.profileId,
            },
        })

        return successAction(newAppointment)
    } catch (error) {
        console.error(error)

        return errorAction('Falha ao realizar agendamento.')
    }
}
