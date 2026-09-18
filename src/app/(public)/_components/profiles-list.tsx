'use client'

import { ArrowRight, Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import professionalImage from '@/../public/foto1.png'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { User } from '@/generated/prisma/client'

interface ProfilesListProps {
    profiles: User[]
}

export function ProfilesList({ profiles }: ProfilesListProps) {
    const router = useRouter()
    const [isNavigating, startTransition] = useTransition()

    const handleNavigateToSearch = () => {
        startTransition(() => {
            router.push('/search')
        })
    }

    return (
        <section className="bg-slate-50 py-16" id="profissionais">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="mb-12 text-center text-3xl font-bold">
                    Você pode querer conhecer
                </h2>

                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {profiles.map((profile, index) => (
                        <Card
                            key={profile.id}
                            className="animate-fade-up overflow-hidden border-none transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            <CardContent className="p-0">
                                <div>
                                    <div className="relative h-48">
                                        <Image
                                            src={
                                                profile.image ||
                                                professionalImage
                                            }
                                            alt="Foto do profissional"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold">
                                                {profile.name}
                                            </h3>
                                            <p className="text-sm text-slate-500 line-clamp-1">
                                                {profile.address ??
                                                    'Endereço não informado'}
                                            </p>
                                        </div>
                                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                    </div>

                                    <Button
                                        asChild
                                        className="flex w-full items-center justify-center rounded-md bg-blue-600 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 md:text-base"
                                    >
                                        <Link
                                            href={`/scheduling/${profile.id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Agendar horário
                                            <ArrowRight className="ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </section>

                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={handleNavigateToSearch}
                        disabled={isNavigating}
                        aria-busy={isNavigating}
                        className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80"
                    >
                        {isNavigating ? (
                            <>
                                <Loader className="h-4 w-4 animate-spin" />
                                Carregando...
                            </>
                        ) : (
                            <>
                                Ver mais
                                <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </section>
    )
}
