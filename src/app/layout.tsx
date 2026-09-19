import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import SessionAuthProvider from '@/components/session-auth'
import { QueryClientContext } from '@/providers/query-client'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Agendly - Plataforma de agendamento de serviços',
    description:
        'Encontre profissionais e agende serviços de forma simples e organizada.',
    robots: {
        index: true,
        follow: true,
        nocache: true,
    },
    openGraph: {
        title: 'Agendly - Plataforma de agendamento de serviços',
        description:
            'Encontre profissionais e agende serviços de forma simples e organizada.',
        images: [`${process.env.NEXT_PUBLIC_URL}/logo.png`],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SessionAuthProvider>
                    <QueryClientContext>
                        <Toaster duration={2500} />
                        {children}
                    </QueryClientContext>
                </SessionAuthProvider>
            </body>
        </html>
    )
}
