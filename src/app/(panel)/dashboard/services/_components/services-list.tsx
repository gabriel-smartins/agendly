'use client'

import { Pencil, PlusIcon, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Service } from '@/generated/prisma/client'
import { convertCentsToReal } from '@/utils/convertCurrency'
import { formatCurrency } from '@/utils/formatCurrency'
import { ResponsePermissionProp } from '@/utils/permissions/hasPermission'
import { deleteService } from '../_actions/delete-service'
import { DialogService } from './dialog-service'

interface ServicesListProps {
    services: Service[]
    permission: ResponsePermissionProp
}

export function ServicesList({ services, permission }: ServicesListProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editing, setEditing] = useState<null | Service>(null)

    async function handleDeleteService(serviceId: string) {
        const response = await deleteService({ serviceId })

        if (!response.success) {
            toast.error(response.error)
            return
        }

        toast.success(response.data)
    }

    async function handleUpdateService(service: Service) {
        setEditing(service)
        setIsDialogOpen(true)
    }

    return (
        <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
                setIsDialogOpen(open)

                if (!open) {
                    setEditing(null)
                }
            }}
        >
            <section>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl md:text-2xl font-bold">
                            Serviços
                        </CardTitle>
                        {permission.hasPermission && (
                            <DialogTrigger asChild>
                                <Button className="bg-neutral-950 hover:bg-neutral-800">
                                    <PlusIcon className="w-4 h-4 text-white" />
                                </Button>
                            </DialogTrigger>
                        )}

                        {!permission.hasPermission && (
                            <Link
                                href="/dashboard/plans"
                                className="text-red-500"
                            >
                                Limite de serviços do seu plano atingido
                            </Link>
                        )}

                        <DialogContent
                            className="bg-white"
                            onInteractOutside={(e) => {
                                e.preventDefault()
                                setIsDialogOpen(false)
                                setEditing(null)
                            }}
                        >
                            {isDialogOpen && (
                                <DialogService
                                    closeModal={() => {
                                        setIsDialogOpen(false)
                                        setEditing(null)
                                    }}
                                    serviceId={editing ? editing.id : undefined}
                                    initialValues={
                                        editing
                                            ? {
                                                  name: editing.name,
                                                  price: convertCentsToReal(
                                                      editing.price
                                                  ),
                                                  hours: Math.floor(
                                                      editing.duration / 60
                                                  ).toString(),
                                                  minutes: (
                                                      editing.duration % 60
                                                  ).toString(),
                                              }
                                            : undefined
                                    }
                                />
                            )}
                        </DialogContent>
                    </CardHeader>
                    <CardContent>
                        <section className="space-y-4 mt-5">
                            {services.map((service) => (
                                <article
                                    key={service.id}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold">
                                            {service.name}
                                        </span>
                                        <span className="text-gray-500">-</span>
                                        <span className="text-gray-500">
                                            {formatCurrency(
                                                service.price / 100
                                            )}
                                        </span>
                                    </div>
                                    <div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-gray-100"
                                            onClick={() =>
                                                handleUpdateService(service)
                                            }
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-gray-100"
                                            onClick={() =>
                                                handleDeleteService(service.id)
                                            }
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </article>
                            ))}
                        </section>
                    </CardContent>
                </Card>
            </section>
        </Dialog>
    )
}
