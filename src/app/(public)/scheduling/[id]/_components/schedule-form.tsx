'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const scheduleSchema = z.object({
    name: z.string().min(1, { message: 'o nome é obrigatório.' }),
    email: z.string().email({ message: 'O email é obrigatório.' }),
    phone: z.string().min(1, 'Informe um telefone para contato.'),
    date: z.date(),
    serviceId: z.string().min(1, {
        message: 'É necessário informar um serviço no agendamento.',
    }),
})

export type ScheduleFormData = z.infer<typeof scheduleSchema>

export function useScheduleForm() {
    return useForm<ScheduleFormData>({
        resolver: zodResolver(scheduleSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            date: new Date(),
            serviceId: '',
        },
    })
}
