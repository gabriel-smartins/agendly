import Link from 'next/link'
import { RegisterCard } from './_components/register-card'

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-12">
            <div className="w-full max-w-5xl">
                <div className="mb-8 flex items-center justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
                    >
                        <span>←</span>
                        <span>Voltar para a home</span>
                    </Link>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] sm:p-6">
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                        <div className="space-y-6 rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                                Agendly
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                                    Crie sua conta e comece a organizar seu
                                    atendimento.
                                </h1>
                                <p className="max-w-lg text-base text-slate-300">
                                    Cadastre-se com seu nome, e-mail e senha
                                    para entrar na plataforma e aproveitar os
                                    recursos do painel.
                                </p>
                            </div>
                            <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                                    Nome
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                                    E-mail
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                                    Senha
                                </div>
                            </div>
                        </div>

                        <RegisterCard />
                    </div>
                </div>
            </div>
        </main>
    )
}
