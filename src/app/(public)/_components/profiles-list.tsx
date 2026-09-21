'use client'

import { ArrowRight, Loader, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import genericProfileImage from '@/../public/generic-profile-pic.jpg'
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
                    {profiles.map((profile, index) => {
                        const addressText =
                            profile.address?.trim() || 'Não informado'
                        const profileImage =
                            profile.image && /^https?:\/\//.test(profile.image)
                                ? profile.image
                                : genericProfileImage

                        return (
                            <Card
                                key={profile.id}
                                className="animate-fade-up overflow-hidden border-none transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <CardContent className="p-0">
                                    <div>
                                        <div className="relative h-48">
                                            <Image
                                                src={profileImage}
                                                alt="Foto do profissional"
                                                fill
                                                className="object-cover"
                                                onError={(event) => {
                                                    if (
                                                        event.currentTarget
                                                            .src !==
                                                        genericProfileImage.src
                                                    ) {
                                                        event.currentTarget.src =
                                                            genericProfileImage.src
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex h-full flex-col justify-between gap-4 p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="line-clamp-2 min-h-[2.75rem] font-semibold leading-5 text-slate-900">
                                                    {profile.name}
                                                </h3>
                                                <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                                                    <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                                                    <span className="line-clamp-1">
                                                        {addressText}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                                        </div>

                                        <Button
                                            asChild
                                            className="mt-auto flex w-full items-center justify-center rounded-md bg-blue-600 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 md:text-base"
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
                        )
                    })}
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
