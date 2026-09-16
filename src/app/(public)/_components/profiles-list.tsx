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
        <section className="bg-slate-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl text-center mb-12 font-bold">
                    Profissionais
                </h2>

                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {profiles.map((profile) => (
                        <Card className="overflow-hidden border-none hover:shadow-lg duration-500">
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
                                <div className="p-4 space-y-4">
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
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <Link
                                        href={`/scheduling/${profile.id}`}
                                        target="_blank"
                                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center py-2 rounded-md text-sm md:text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                                    >
                                        Agendar horário
                                        <ArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </section>
            </div>
        </section>
    )
}
