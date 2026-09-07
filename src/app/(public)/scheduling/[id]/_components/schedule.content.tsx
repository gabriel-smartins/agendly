'use client'

import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import imgTest from '@/../public/foto1.png'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Prisma } from '@/generated/prisma/client'
import { maskPhone } from '@/utils/mask-phone'
import { createNewAppointment } from '../_actions/create-appointment'
import { DateTimePicker } from './date-picker'
import { ScheduleFormData, useScheduleForm } from './schedule-form'
import { ScheduleTimeList } from './schedule-times-list'

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true
        services: true
    }
}>

interface ScheduleContentProps {
    clinic: UserWithServiceAndSubscription
}

export interface TimeSlot {
    time: string
    isAvailable: boolean
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {
    const form = useScheduleForm()
    const { watch } = form

    const selectedDate = watch('date')
    const selectedServiceId = watch('serviceId')

    const [selectedTime, setSelectedTime] = useState('')
    const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([])
    const [loadingSlots, setLoadingSlots] = useState(false)

    const [blockedTimes, setBlockedTimes] = useState<string[]>([])

    const fetchBlockedTimes = useCallback(
        async (date: Date): Promise<string[]> => {
            setLoadingSlots(true)
            try {
                const dateString = date.toISOString().split('T')[0]
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`
                )

                const json = await response.json()
                setLoadingSlots(false)

                return json
            } catch (error) {
                console.error(error)
                setLoadingSlots(false)

                return []
            }
        },
        [clinic.id]
    )

    useEffect(() => {
        if (selectedDate) {
            fetchBlockedTimes(selectedDate).then((blocked) => {
                setBlockedTimes(blocked)

                const times = clinic.times || []

                const finalSlots = times.map((time) => ({
                    time: time,
                    isAvailable: !blocked.includes(time),
                }))

                setAvailableTimeSlots(finalSlots)

                const stillAvailable = finalSlots.find(
                    (slot) => slot.time === selectedTime && slot.isAvailable
                )

                if (!stillAvailable) {
                    setSelectedTime('')
                }
            })
        }
    }, [selectedDate, clinic.times, fetchBlockedTimes, selectedTime])

    async function onSubmit(formData: ScheduleFormData) {
        if (!selectedTime) {
            return
        }

        const response = await createNewAppointment({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            time: selectedTime,
            date: formData.date,
            serviceId: formData.serviceId,
            clinicId: clinic.id,
        })

        if (response.error) {
            toast.error(response.error)
        }

        toast.success('Agendamento realizado com sucesso!')
        form.reset()
        setSelectedTime('')
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-32 bg-emerald-500" />
            <section className="container mx-auto px-4 -mt-16">
                <div className="max-w-2xl mx-auto">
                    <article className="flex flex-col items-center">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-8">
                            <Image
                                src={clinic.image ? clinic.image : imgTest}
                                alt="foto da clinica"
                                className="object-cover"
                                fill
                            />
                        </div>

                        <h1 className="text-2xl font-bold mb-2">
                            {clinic.name}
                        </h1>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-5 h-5" />
                            <span>
                                {clinic.address
                                    ? clinic.address
                                    : 'Endereço não informado'}
                            </span>
                        </div>
                    </article>
                </div>
            </section>

            <section className="max-w-2xl mx-auto w-full mt-6">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mx-2 space-y-6 bg-white p-6 border rounded-md shadow-sm"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Nome completo:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            placeholder="Digite seu nome..."
                                            className="placeholder:text-gray-400"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Email:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            placeholder="Digite seu email..."
                                            className="placeholder:text-gray-400"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Telefone:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="phone"
                                            placeholder="(XX) XXXXX-XXXX"
                                            className="placeholder:text-gray-400"
                                            onChange={(e) => {
                                                const formattedValue =
                                                    maskPhone(e.target.value)
                                                field.onChange(formattedValue)
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2 space-y-1">
                                    <FormLabel className="font-semibold">
                                        Data do agendamento:
                                    </FormLabel>
                                    <FormControl>
                                        <DateTimePicker
                                            className="w-full rounded border p-2"
                                            initialDate={new Date()}
                                            onChange={(date) => {
                                                if (date) {
                                                    field.onChange(date)
                                                    setSelectedTime('')
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="serviceId"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="font-semibold">
                                        Selecione o serviço:
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                setSelectedTime('')
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um serviço" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                {clinic.services.map(
                                                    (service) => (
                                                        <SelectItem
                                                            key={service.id}
                                                            value={service.id}
                                                        >
                                                            {service.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {selectedServiceId && (
                            <div className="space-y-2">
                                <Label className="font-semibold">
                                    Horários disponíveis:
                                </Label>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    {loadingSlots ? (
                                        <p>Carregando horários...</p>
                                    ) : availableTimeSlots.length === 0 ? (
                                        <p>Nenhum horário disponível.</p>
                                    ) : (
                                        <ScheduleTimeList
                                            selectedDate={selectedDate}
                                            selectedTime={selectedTime}
                                            requiredSlots={
                                                clinic.services.find(
                                                    (service) =>
                                                        service.id ===
                                                        selectedServiceId
                                                )
                                                    ? Math.ceil(
                                                          clinic.services.find(
                                                              (service) =>
                                                                  service.id ===
                                                                  selectedServiceId
                                                          )!.duration / 30
                                                      )
                                                    : 1
                                            }
                                            blockedTimes={blockedTimes}
                                            availableTimeSlots={
                                                availableTimeSlots
                                            }
                                            clinicTimes={clinic.times}
                                            onSelectTime={(time) =>
                                                setSelectedTime(time)
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {clinic.status ? (
                            <Button
                                type="submit"
                                className="w-full text-white bg-emerald-500 hover:bg-emerald-400"
                                disabled={
                                    !watch('name') ||
                                    !watch('email') ||
                                    !watch('phone') ||
                                    !watch('date') ||
                                    !watch('serviceId')
                                }
                            >
                                Realizar agendamento
                            </Button>
                        ) : (
                            <p className="bg-red-500 text-white text-center px-4 py-2 rounded-md">
                                A clínica está fechada nesse momento.
                            </p>
                        )}
                    </form>
                </Form>
            </section>
        </div>
    )
}
