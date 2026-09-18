import { SearchDisplay } from './_components/search-display'
import { SearchFilters } from './_components/search-filters'
import { getProfilesWithFilters } from './_data-access/get-profiles-with-filters'

interface SearchPageProps {
    searchParams?: Promise<{
        [key: string]: string | string[] | undefined
    }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const resolvedSearchParams = (await searchParams) ?? {}

    const nameParam =
        typeof resolvedSearchParams.name === 'string'
            ? resolvedSearchParams.name
            : undefined
    const serviceParam =
        typeof resolvedSearchParams.service === 'string'
            ? resolvedSearchParams.service
            : undefined

    const result = await getProfilesWithFilters({
        name: nameParam,
        service: serviceParam,
    })

    return (
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <a
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
                >
                    <span>←</span>
                    <span>Home</span>
                </a>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Encontre o melhor atendimento
                </p>
                <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                    Encontre o que precisa
                </h1>
                <p className="mt-2 text-slate-500">
                    Busque por estabelecimentos ou serviços específicos.
                </p>
            </div>

            <SearchFilters />

            {!result.success ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-600">
                    <p>{result.error}</p>
                </div>
            ) : (
                <SearchDisplay profiles={result.data} />
            )}
        </main>
    )
}
