'use client'

import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { registerUser } from '../_actions/register-user'

export function RegisterCard() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    async function handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setErrorMessage('')

        if (password.length < 6) {
            setErrorMessage('A senha deve ter pelo menos 6 caracteres.')
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage('As senhas não conferem.')
            return
        }

        setIsSubmitting(true)

        try {
            await registerUser({
                name,
                email,
                password,
                confirmPassword,
            })

            router.push('/login')
            router.refresh()
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : 'Não foi possível concluir o cadastro.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full max-w-xl border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm">
            <CardHeader className="space-y-3 pb-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Cadastro
                </div>
                <CardTitle className="text-3xl font-bold text-slate-900">
                    Crie sua conta
                </CardTitle>
                <CardDescription className="text-base text-slate-500">
                    Preencha os dados abaixo para criar sua conta de acesso.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-slate-700"
                        >
                            Nome
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Seu nome completo"
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="register-email"
                            className="text-sm font-medium text-slate-700"
                        >
                            E-mail
                        </label>
                        <Input
                            id="register-email"
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
                            htmlFor="register-password"
                            className="text-sm font-medium text-slate-700"
                        >
                            Senha
                        </label>
                        <Input
                            id="register-password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Crie uma senha"
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="confirm-password"
                            className="text-sm font-medium text-slate-700"
                        >
                            Confirmar senha
                        </label>
                        <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            placeholder="Repita sua senha"
                            autoComplete="new-password"
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
                                Cadastrando...
                            </>
                        ) : (
                            'Criar conta'
                        )}
                    </Button>
                </form>

                <p className="mt-4 text-center text-sm text-slate-500">
                    Já tem conta?{' '}
                    <Link
                        href="/login"
                        className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                    >
                        Fazer login
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}
