import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import professionalImage from '@/../public/foto1.png'
import { Card, CardContent } from '@/components/ui/card'
import { User } from '@/generated/prisma/client'

interface ProfilesListProps {
    profiles: User[]
}

export function ProfilesList({ profiles }: ProfilesListProps) {
    return (
        <section className="bg-slate-50 py-16" id="profissionais">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl text-center mb-12 font-bold">
                    Você pode querer conhecer
                </h2>

                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {profiles.map((profile) => (
                        <Card
                            key={profile.id}
                            className="overflow-hidden border-none duration-500 hover:shadow-lg"
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
                                            <p className="text-sm text-slate-500">
                                                {profile.address ??
                                                    'Endereço não informado'}
                                            </p>
                                        </div>
                                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <Link
                                        href={`/scheduling/${profile.id}`}
                                        target="_blank"
                                        className="flex items-center justify-center rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 md:text-base"
                                    >
                                        Agendar horário
                                        <ArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </section>

                <div className="mt-8 flex justify-center">
                    <Link
                        href="/search"
                        className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                    >
                        Ver mais
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
