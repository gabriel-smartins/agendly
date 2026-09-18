import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Prisma } from '@/generated/prisma/client'

type ProfileWithServices = Prisma.UserGetPayload<{
    include: { services: true }
}>

interface SearchResultsProps {
    profiles: ProfileWithServices[]
}

export function SearchDisplay({ profiles }: SearchResultsProps) {
    if (profiles.length === 0) {
        return (
            <Card className="border-dashed border-slate-300 bg-slate-50 shadow-none">
                <CardContent className="py-12 text-center">
                    <p className="text-slate-500">
                        Nenhum resultado encontrado com os filtros atuais.
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {profiles.map((profile, index) => (
                <Card
                    key={profile.id}
                    className="animate-fade-up flex h-full flex-col border-slate-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
                    style={{ animationDelay: `${index * 65}ms` }}
                >
                    <CardContent className="flex h-full flex-col p-5">
                        <div className="mb-4 flex items-center gap-3">
                            {profile.image && (
                                <img
                                    src={profile.image}
                                    alt={
                                        profile.name || 'Perfil do profissional'
                                    }
                                    className="h-11 w-11 rounded-full object-cover"
                                />
                            )}
                            <h3 className="text-lg font-semibold text-slate-900">
                                {profile.name || 'Sem nome'}
                            </h3>
                        </div>

                        {profile.address && (
                            <p className="mb-4 text-sm text-slate-500">
                                {profile.address}
                            </p>
                        )}

                        <div className="mt-auto flex flex-wrap gap-2">
                            {profile.services.slice(0, 3).map((svc) => (
                                <span
                                    key={svc.id}
                                    className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                                >
                                    {svc.name}
                                </span>
                            ))}
                            {profile.services.length > 3 && (
                                <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                                    +{profile.services.length - 3}
                                </span>
                            )}
                        </div>

                        <Button asChild className="mt-5 w-full">
                            <Link
                                href={`/scheduling/${profile.id}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ver horários
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
