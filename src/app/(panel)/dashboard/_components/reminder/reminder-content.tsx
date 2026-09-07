'use client'

import { useRouter } from 'next/navigation'
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

    const router = useRouter()

    async function onSubmit(formData: ReminderFormData) {
        const response = await createReminder({
            description: formData.description,
        })

        if (response.error) {
            toast.error(response.error)
            return
        }

        toast.success(response.data)
        router.refresh()
        closeDialog()
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
                        disabled={!form.watch('description')}
                    >
                        Cadastrar lembrete
                    </Button>
                </form>
            </Form>
        </div>
    )
}
