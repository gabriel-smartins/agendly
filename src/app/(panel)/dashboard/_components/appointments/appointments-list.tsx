'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Eye, Loader, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Prisma } from '@/generated/prisma/client'
import { cancelAppointment } from '../../_actions/cancel-appointment'
import { DatePickerButton } from './date-picker-button'
import { DialogAppointment } from './dialog-appointments'
import { AppointmentsSkeleton } from './appointments-skeleton'

interface AppointmentsListProps {
    times: string[]
}

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
    include: {
        service: true
    }
}>

export function AppointmentsList({ times }: AppointmentsListProps) {
    const searchParams = useSearchParams()
    const date = searchParams.get('date')
    const queryClient = useQueryClient()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [detailAppointment, setDetailAppointment] =
        useState<AppointmentWithService | null>(null)
    const [cancellingAppointmentId, setCancellingAppointmentId] = useState<
        string | null
    >(null)

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['get-appointments', date],
        queryFn: async () => {
            let activeDate = date

            if (!activeDate) {
                const today = format(new Date(), 'yyyy-MM-dd')
                activeDate = today
            }

            const url = `${process.env.NEXT_PUBLIC_URL}/api/appointments?date=${activeDate}`

            const response = await fetch(url)
            const json = await response.json().catch(() => null)

            if (!response.ok || !json?.success) {
                console.error(
                    'Falha ao buscar na API:',
                    response.status,
                    json?.error || 'Resposta inválida da API.'
                )
                return []
            }

            return (json.data || []) as AppointmentWithService[]
        },

        staleTime: 20000,
        refetchInterval: 30000,
    })

    const occupantMap: Record<string, AppointmentWithService> = {}

    const cleanTimes = times.map((t) => t.trim())

    if (data && data.length > 0) {
        for (const appointment of data) {
            const duration = appointment.service?.duration || 30
            const requiredSlots = Math.ceil(duration / 30)

            const cleanTime = appointment.time.trim()

            const startIndex = cleanTimes.indexOf(cleanTime)

            if (startIndex !== -1) {
                for (let i = 0; i < requiredSlots; i++) {
                    const slotIndex = startIndex + i

                    if (slotIndex < cleanTimes.length) {
                        occupantMap[cleanTimes[slotIndex]] = appointment
                    }
                }
            }
        }
    }

    async function handleCancelAppointment(appointmentId: string) {
        setCancellingAppointmentId(appointmentId)

        try {
            const response = await cancelAppointment({ appointmentId })

            if (!response.success) {
                toast.error(response.error)
                return
            }

            queryClient.invalidateQueries({ queryKey: ['get-appointments'] })
            await refetch()
            toast.success(response.data)
        } finally {
            setCancellingAppointmentId(null)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl md:text-2xl font-bold">
                        Agendamentos
                    </CardTitle>

                    <DatePickerButton />
                </CardHeader>

                <CardContent>
                    <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4">
                        {isLoading ? (
                            <AppointmentsSkeleton />
                        ) : (
                            cleanTimes.map((slot) => {
                                const occupant = occupantMap[slot]

                                if (occupant) {
                                    return (
                                        <div
                                            key={slot}
                                            className="flex items-center py-2 border-t last:border-b"
                                        >
                                            <div className="w-16 text-sm font-semibold">
                                                {slot}
                                            </div>
                                            <div className="flex-1 text-sm">
                                                <div className="font-semibold">
                                                    {occupant.name}
                                                </div>
                                                <div className="text-sm text-slate-500">
                                                    {occupant.phone}
                                                </div>
                                            </div>
                                            <div className="ml-auto">
                                                <div className="flex">
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="hover:bg-slate-100"
                                                            onClick={() =>
                                                                setDetailAppointment(
                                                                    occupant
                                                                )
                                                            }
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="hover:bg-slate-100"
                                                        onClick={() =>
                                                            handleCancelAppointment(
                                                                occupant.id
                                                            )
                                                        }
                                                        disabled={
                                                            cancellingAppointmentId ===
                                                            occupant.id
                                                        }
                                                    >
                                                        {cancellingAppointmentId ===
                                                        occupant.id ? (
                                                            <Loader className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <X className="w-4 h-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                return (
                                    <div
                                        key={slot}
                                        className="flex items-center py-2 border-t last:border-b"
                                    >
                                        <div className="w-16 text-sm font-semibold">
                                            {slot}
                                        </div>
                                        <div className="flex-1 text-sm text-slate-500">
                                            Disponível
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
            <DialogAppointment appointment={detailAppointment} />
        </Dialog>
    )
}
