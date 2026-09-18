'use server'

import bcrypt from 'bcryptjs'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const registerSchema = z.object({
    name: z.string().trim().min(2, 'Informe seu nome completo.'),
    email: z.string().trim().email('Informe um e-mail válido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
    confirmPassword: z.string(),
})

export async function registerUser(input: {
    name: string
    email: string
    password: string
    confirmPassword: string
}) {
    const result = registerSchema.safeParse(input)

    if (!result.success) {
        throw new Error(result.error.issues[0]?.message ?? 'Dados inválidos.')
    }

    const { name, email, password, confirmPassword } = result.data

    if (password !== confirmPassword) {
        throw new Error('As senhas não conferem.')
    }

    const normalizedEmail = email.toLowerCase()

    const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
    })

    if (existingUser) {
        throw new Error('Este e-mail já está cadastrado.')
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.create({
        data: {
            name,
            email: normalizedEmail,
            password: hashedPassword,
        },
    })
}
