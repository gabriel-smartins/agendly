'use client'

import { Loader, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Reminder } from '@/generated/prisma/client'
import { deleteReminder } from '../../_actions/delete-reminder'
import { ReminderContent } from './reminder-content'

interface ReminderListProps {
    reminder: Reminder[]
}

export function ReminderList({ reminder }: ReminderListProps) {
    const router = useRouter()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [deletingReminderId, setDeletingReminderId] = useState<string | null>(
        null
    )

    async function handleDeleteReminder(reminderId: string) {
        setDeletingReminderId(reminderId)

        try {
            const response = await deleteReminder({ reminderId })

            if (!response.success) {
                toast.error(response.error)
                return
            }

            toast.success(response.data)
            router.refresh()
        } finally {
            setDeletingReminderId(null)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl md:text-2xl font-bold">
                        Lembretes
                    </CardTitle>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-9 p-0 shadow-none"
                            >
                                <Plus className="w-5 h-5" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Novo lembrete</DialogTitle>
                                <DialogDescription>
                                    Criar um novo lembrete para sua lista.
                                </DialogDescription>
                            </DialogHeader>

                            <ReminderContent
                                closeDialog={() => setIsDialogOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    {reminder.length === 0 && (
                        <p className="text-sm text-gray-500">
                            Nenhum lembrete encontrado...
                        </p>
                    )}
                    <ScrollArea className="h-[340px] lg:max-h-[calc(100vh-15rem)] pr-0 w-full flex-1">
                        <div className="flex flex-col gap-2">
                            {reminder.map((item) => (
                                <article
                                    key={item.id}
                                    className="flex flex-row items-center justify-between py-2 px-2 bg-yellow-100 rounded-md gap-3"
                                >
                                    <p className="text-sm lg:text-base">
                                        {item.description}
                                    </p>
                                    <Button
                                        className="bg-red-500 hover:bg-red-400 shadow-none rounded-full p-2"
                                        size="sm"
                                        onClick={() =>
                                            handleDeleteReminder(item.id)
                                        }
                                        disabled={
                                            deletingReminderId === item.id
                                        }
                                    >
                                        {deletingReminderId === item.id ? (
                                            <Loader className="h-5 w-5 animate-spin text-white" />
                                        ) : (
                                            <Trash className="w-5 h-5 text-white" />
                                        )}
                                    </Button>
                                </article>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}
