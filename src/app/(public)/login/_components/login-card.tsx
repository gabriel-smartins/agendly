'use client'

import { ArrowLeft, Loader2, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { type FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function LoginCard() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    async function handleCredentialsLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        setErrorMessage('')

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl: '/dashboard',
        })

        setIsSubmitting(false)

        if (result?.error) {
            setErrorMessage('Credenciais inválidas. Tente novamente.')
            return
        }

        router.push('/dashboard')
        router.refresh()
    }

    return (
        <Card className="w-full max-w-xl border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm">
            <CardHeader className="space-y-3 pb-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Acesso ao painel
                </div>
                <CardTitle className="text-3xl font-bold text-slate-900">
                    Entre na sua conta
                </CardTitle>
                <CardDescription className="text-base text-slate-500">
                    Acesse com GitHub, Google ou usando e-mail e senha.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                        type="button"
                        onClick={() =>
                            signIn('github', { callbackUrl: '/dashboard' })
                        }
                        className="flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800"
                    >
                        <ShieldCheck className="h-4 w-4" />
                        GitHub
                    </Button>
                    <Button
                        type="button"
                        onClick={() =>
                            signIn('google', { callbackUrl: '/dashboard' })
                        }
                        className="flex items-center justify-center gap-2 bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                    >
                        <ShieldCheck className="h-4 w-4" />
                        Google
                    </Button>
                </div>

                <div className="relative flex items-center justify-center">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="px-3 text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                        ou continue com e-mail
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                </div>

                <form onSubmit={handleCredentialsLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-slate-700"
                        >
                            E-mail
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="seu@email.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-slate-700"
                        >
                            Senha
                        </label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Sua senha"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {errorMessage ? (
                        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {errorMessage}
                        </p>
                    ) : null}

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-80"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Entrando...
                            </>
                        ) : (
                            'Entrar com e-mail'
                        )}
                    </Button>
                </form>

                <p className="text-center text-sm text-slate-500">
                    Ainda não tem conta?{' '}
                    <Link
                        href="/register"
                        className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                    >
                        Criar conta
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}
