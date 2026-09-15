'use client'

import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
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
import { createReminder } from '../../_actions/create-reminder'
import { ReminderFormData, useReminderForm } from './reminder-form'

interface ReminderContentProps {
    closeDialog: () => void
}

export function ReminderContent({ closeDialog }: ReminderContentProps) {
    const form = useReminderForm()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const router = useRouter()

    async function onSubmit(formData: ReminderFormData) {
        setIsSubmitting(true)

        try {
            const response = await createReminder({
                description: formData.description,
            })

            if (!response.success) {
                toast.error(response.error)
                return
            }

            toast.success(response.data)
            router.refresh()
            closeDialog()
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="grid gap-4 py-4">
            <Form {...form}>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold">
                                    Descrição
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Digite qual o lembrete..."
                                        className="placeholder:text-gray-400"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-400 text-white"
                        disabled={isSubmitting || !form.watch('description')}
                    >
                        {isSubmitting && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isSubmitting ? 'Cadastrando...' : 'Cadastrar lembrete'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
