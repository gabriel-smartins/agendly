'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'
import imgTeste from '@/../public/foto1.png'
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
import { cn } from '@/lib/utils'
import { maskPhone } from '@/utils/mask-phone'
import { updateProfile } from '../_actions/update-profile'
import { ProfileFormData, useProfileForm } from './profile-form'

type UserWithSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true
    }
}>

interface ProfileContentProps {
    user: UserWithSubscription
}

export function ProfileContent({ user }: ProfileContentProps) {
    const router = useRouter()
    const [selectedHours, setSelecterdHours] = useState<string[]>(
        user.times ?? []
    )
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const { update } = useSession()

    const form = useProfileForm({
        name: user.name,
        address: user.address,
        phone: user.phone,
        status: user.status,
        timezone: user.timezone,
    })

    function generateTimeSlots(): string[] {
        const hours: string[] = []

        for (let i = 8; i <= 24; i++) {
            for (let j = 0; j < 2; j++) {
                const hour = i.toString().padStart(2, '0')
                const minute = (j * 30).toString().padStart(2, '0')

                hours.push(`${hour}:${minute}`)
            }
        }

        return hours
    }

    const hours = generateTimeSlots()

    function toggleHour(hour: string) {
        setSelecterdHours((prev) =>
            prev.includes(hour)
                ? prev.filter((h) => h !== hour)
                : [...prev, hour].sort()
        )
    }

    const timeZones = Intl.supportedValuesOf('timeZone').filter(
        (zone) =>
            zone.startsWith('America/Sao_Paulo') ||
            zone.startsWith('America/Manaus') ||
            zone.startsWith('America/Rio_Branco') ||
            zone.startsWith('America/Noronha')
    )

    async function onSubmit(values: ProfileFormData) {
        const response = await updateProfile({
            name: values.name,
            address: values.address,
            status: values.status === 'active' ? true : false,
            phone: values.phone,
            timezone: values.timezone,
            times: selectedHours || [],
        })

        if (!response.success) {
            toast.error(response.error)
            return
        }

        toast.success(response.data)
    }

    async function handleLogout() {
        await signOut()
        await update()
        router.replace('/')
    }

    return (
        <div className="mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Meu perfil</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-center">
                                <div className="bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden">
                                    <Image
                                        src={user.image ? user.image : imgTeste}
                                        alt="Foto de perfil"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Nome completo
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="placeholder:text-gray-400"
                                                    {...field}
                                                    placeholder="Digite o nome da clínica..."
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Endereço completo
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="placeholder:text-gray-400"
                                                    {...field}
                                                    placeholder="Digite o endereço da clínica..."
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
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Telefone
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="placeholder:text-gray-400"
                                                    {...field}
                                                    placeholder="ex: (99) 91111-1111"
                                                    onChange={(e) => {
                                                        const maskedValue =
                                                            maskPhone(
                                                                e.target.value
                                                            )
                                                        field.onChange(
                                                            maskedValue
                                                        )
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Status da clínica
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={
                                                        field.value
                                                            ? 'active'
                                                            : 'inactive'
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o status da clínica" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        <SelectItem value="active">
                                                            ATIVO (clínica
                                                            aberta)
                                                        </SelectItem>
                                                        <SelectItem value="inactive">
                                                            INATIVO (clínica
                                                            fechada)
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-2">
                                    <Label className="font-semibold">
                                        Configurar horários da clínica
                                    </Label>

                                    <Dialog
                                        open={dialogIsOpen}
                                        onOpenChange={setDialogIsOpen}
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-between"
                                            >
                                                Clique aqui para selecionar
                                                horários
                                                <ArrowRight />
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent className="bg-white">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Horários da clínica
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Selecione abaixo os horários
                                                    de funcionamento da clínica:
                                                </DialogDescription>
                                            </DialogHeader>

                                            <section className="py-4">
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Clique nos horários abaixo
                                                    para marcar ou desmarcar:
                                                </p>

                                                <div className="grid grid-cols-5 gap-2">
                                                    {hours.map((hour) => (
                                                        <Button
                                                            key={hour}
                                                            variant="outline"
                                                            className={cn(
                                                                'h-10',
                                                                selectedHours.includes(
                                                                    hour
                                                                ) &&
                                                                    'border-2 border-emerald-500 text-primary'
                                                            )}
                                                            onClick={() =>
                                                                toggleHour(hour)
                                                            }
                                                        >
                                                            {hour}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </section>

                                            <Button
                                                className="bg-emerald-500 text-white hover:bg-emerald-400 w-full"
                                                onClick={() =>
                                                    setDialogIsOpen(false)
                                                }
                                            >
                                                Salvar horários
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="timezone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Selecione o fuso-horário
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o seu fuso-horário" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        {timeZones.map(
                                                            (zone) => (
                                                                <SelectItem
                                                                    key={zone}
                                                                    value={zone}
                                                                >
                                                                    {zone}
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
                                <Button
                                    type="submit"
                                    className="bg-emerald-500 hover:bg-emerald-400 text-white w-full"
                                >
                                    Salvar alterações
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>

                <section className="mt-4">
                    <Button
                        className="bg-red-600 text-white hover:bg-red-400"
                        onClick={handleLogout}
                    >
                        Sair da conta
                    </Button>
                </section>
            </Form>
        </div>
    )
}
