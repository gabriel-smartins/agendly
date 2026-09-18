'use client'

import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function SearchFilters() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const [isPending, startTransition] = useTransition()

    const handleSearch = (term: string, paramType: 'name' | 'service') => {
        const params = new URLSearchParams(searchParams)

        if (term) {
            params.set(paramType, term)
        } else {
            params.delete(paramType)
        }

        startTransition(() => {
            replace(`${pathname}?${params.toString()}`)
        })
    }

    return (
        <Card className="mb-8 border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <label htmlFor="search-name" className="sr-only">
                        Buscar por nome
                    </label>
                    <Input
                        id="search-name"
                        type="text"
                        placeholder="Buscar empresa parceira..."
                        className="pl-9"
                        defaultValue={searchParams.get('name')?.toString()}
                        onChange={(e) => handleSearch(e.target.value, 'name')}
                    />
                </div>

                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <label htmlFor="search-service" className="sr-only">
                        Buscar por serviço
                    </label>
                    <Input
                        id="search-service"
                        type="text"
                        placeholder="Qual serviço? (ex: Corte, Consulta)"
                        className="pl-9"
                        defaultValue={searchParams.get('service')?.toString()}
                        onChange={(e) =>
                            handleSearch(e.target.value, 'service')
                        }
                    />
                </div>

                {isPending && (
                    <div className="flex items-center text-sm text-slate-500">
                        Buscando...
                    </div>
                )}
            </div>
        </Card>
    )
}
