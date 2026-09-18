'use server'

import { signIn } from '@/lib/auth'

export type LoginType = 'google' | 'github'

export async function handleLogin(provider: LoginType) {
    await signIn(provider, { redirectTo: '/dashboard' })
}
