import Link from 'next/link'

export function LabelSubscription({ expired }: { expired: boolean }) {
    return (
        <div className="bg-rose-600 text-white text-sm md:text-base px-3 py-2 my-4 rounded-md flex flex-col md:items-center md:flex-row justify-between gap-1">
            <div>
                {expired ? (
                    <h3 className="font-semibold">
                        Seu plano expirou ou você não possui um plano ativo!
                    </h3>
                ) : (
                    <h3 className="font-semibold">
                        Você excedeu o limite do seu plano!
                    </h3>
                )}

                <p className="text-sm text-rose-50">
                    Acesse o seu plano para verificar os detalhes
                </p>
            </div>
            <Link
                href="/dashboard/plans"
                className="bg-slate-800 text-white px-3 py-1 rounded-md w-fit hover:bg-slate-700"
            >
                Acessar planos
            </Link>
        </div>
    )
}
