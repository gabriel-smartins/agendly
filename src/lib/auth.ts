import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { z } from 'zod'
import prisma from './prisma'

const credentialsSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(6),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    trustHost: true,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id
            }

            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub as string
            }

            return session
        },
    },
    providers: [
        GitHub,
        Google,
        Credentials({
            name: 'Credenciais',
            credentials: {
                email: { label: 'E-mail', type: 'email' },
                password: { label: 'Senha', type: 'password' },
            },
            async authorize(rawCredentials) {
                const result = credentialsSchema.safeParse(rawCredentials)

                if (!result.success) {
                    return null
                }

                const { email, password } = result.data
                const normalizedEmail = email.toLowerCase()

                const user = await prisma.user.findUnique({
                    where: { email: normalizedEmail },
                })

                if (!user || !user.password) {
                    return null
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                )

                if (!isPasswordValid) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                }
            },
        }),
    ],
})
