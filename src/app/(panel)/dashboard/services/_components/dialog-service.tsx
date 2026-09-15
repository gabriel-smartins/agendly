'use client'

import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { convertRealToCents } from '@/utils/convertCurrency'
import { createNewService } from '../_actions/create-service'
import { updateService } from '../_actions/update-service'
import {
    DialogServiceFormData,
    useDialogServiceForm,
} from './dialog-service-form'

interface DialogServiceProps {
    closeModal: () => void
    serviceId?: string
    initialValues?: {
        name: string
        price: string
        hours: string
        minutes: string
    }
}

interface EditServicePayload {
    serviceId: string
    name: string
    priceInCents: number
    duration: number
}

export function DialogService({
    closeModal,
    serviceId,
    initialValues,
}: DialogServiceProps) {
    const form = useDialogServiceForm({ initialValues })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function onSubmit(values: DialogServiceFormData) {
        setLoading(true)
        const priceInCents = convertRealToCents(values.price)
        const hours = parseInt(values.hours) || 0
        const minutes = parseInt(values.minutes) || 0

        const duration = hours * 60 + minutes

        if (serviceId) {
            await editServiceById({
                serviceId,
                name: values.name,
                priceInCents,
                duration,
            })

            return
        }

        const response = await createNewService({
            name: values.name,
            price: priceInCents,
            duration,
        })

        setLoading(false)

        if (!response.success) {
            toast.error(response.error)
            return
        }

        toast.success('Serviço cadastrado com sucesso!')
        handleCloseModal()
        router.refresh()
    }

    async function editServiceById({
        serviceId,
        name,
        priceInCents,
        duration,
    }: EditServicePayload) {
        const response = await updateService({
            serviceId,
            name,
            price: priceInCents,
            duration,
        })

        setLoading(false)

        if (!response.success) {
            toast.error(response.error)
            return
        }

        toast.success(response.data)
        handleCloseModal()
    }

    function handleCloseModal() {
        form.reset()
        closeModal()
    }

    function handleCurrencyChange(
        event: React.ChangeEvent<HTMLInputElement>,
        onChange: (value: string) => void
    ) {
        let value = event.target.value.replace(/\D/g, '')

        if (value) {
            value = (parseInt(value, 10) / 100).toFixed(2)
            value = value.replace('.', ',')
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        onChange(value)
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Novo serviço</DialogTitle>
                <DialogDescription>Adicione um novo serviço</DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form
                    className="spcace-y-2"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Nome do serviço:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Digite o nome do serviço..."
                                            className="placeholder:text-gray-400"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-800" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Valor do serviço:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="ex: 120,00"
                                            className="placeholder:text-gray-400"
                                            onChange={(e) =>
                                                handleCurrencyChange(
                                                    e,
                                                    field.onChange
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-800" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <p className="font-semibold">
                        Tempo de duração do serviço:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="hours"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Horas:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="1"
                                            min="0"
                                            type="number"
                                            className="placeholder:text-gray-400"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="minutes"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Minutos:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="0"
                                            min="0"
                                            type="number"
                                            className="placeholder:text-gray-400"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full font-semibold text-white bg-emerald-500 mt-2"
                        disabled={loading}
                    >
                        {loading && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {loading
                            ? serviceId
                                ? 'Atualizando serviço...'
                                : 'Cadastrando serviço...'
                            : serviceId
                              ? 'Atualizar serviço'
                              : 'Cadastrar serviço'}
                    </Button>
                </form>
            </Form>

            <div>
                <h1></h1>
            </div>
        </>
    )
}
