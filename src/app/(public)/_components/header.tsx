'use client'

import { ArrowRight, LogIn, Menu } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
export function Header() {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const navItems = [{ href: '#profissionais', label: 'Profissionais' }]

    function handleLogin() {
        router.push('/login')
    }

    const NavLinks = () => (
        <>
            {navItems.map((item) => (
                <Button
                    onClick={() => setIsOpen(false)}
                    key={item.href}
                    asChild
                    className="bg-transparent text-slate-700 hover:bg-blue-50 hover:text-blue-700 shadow-none"
                >
                    <Link href={item.href} className="text-base">
                        {item.label}
                    </Link>
                </Button>
            ))}

            {session ? (
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 justify-center bg-blue-600 text-white py-1 rounded-md px-4 hover:bg-blue-700"
                >
                    Acessar dashboard
                </Link>
            ) : (
                <Button
                    onClick={handleLogin}
                    className="transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                    <LogIn className="h-4 w-4" />
                    Área da empresa
                    <ArrowRight className="h-4 w-4" />
                </Button>
            )}
        </>
    )

    return (
        <header className="fixed top-0 left-0 right-0 z-[50] py-4 px-6 bg-white/70 backdrop-blur-md border-b border-slate-200/50 transition-all duration-300">
            <div className="container mx-auto flex items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl font-extrabold tracking-tight text-slate-700"
                >
                    Agend<span className="text-blue-600">ly</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-2">
                    <NavLinks />
                </nav>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button
                            className="text-slate-700 hover:bg-slate-100/50"
                            variant="ghost"
                            size="icon"
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="w-[280px] sm:w-[320px] bg-white border-l-slate-200"
                    >
                        <SheetHeader className="text-left mb-4">
                            <SheetTitle className="text-xl font-bold text-slate-800">
                                Menu
                            </SheetTitle>
                            <SheetDescription>
                                Acesse as opções da plataforma
                            </SheetDescription>
                        </SheetHeader>

                        <nav className="flex flex-col space-y-3 mt-4">
                            <NavLinks />
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
