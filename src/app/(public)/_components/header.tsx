'use client'

import { LogIn, Menu } from 'lucide-react'
import Link from 'next/link'
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
import { handleRegister } from '../_actions/login'

export function Header() {
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [{ href: '#profissionais', label: 'Profissionais' }]

    async function handleLogin() {
        await handleRegister('github')
    }

    const NavLinks = () => (
        <>
            {navItems.map((item) => (
                <Button
                    onClick={() => setIsOpen(false)}
                    key={item.href}
                    asChild
                    className="bg-transparent text-black hover:bg-transparent shadow-none"
                >
                    <Link href={item.href} className="text-base">
                        {item.label}
                    </Link>
                </Button>
            ))}

            {session ? (
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 justify-center bg-zinc-900 text-white py-1 rounded-md px-4"
                >
                    Acessar clínica
                </Link>
            ) : (
                <Button onClick={handleLogin}>
                    <LogIn />
                    Portal da clínica
                </Button>
            )}
        </>
    )

    return (
        <header className="fixed top-0 left-0 right-0 z-[40] py-4 px-6 bg-white">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-zinc-900">
                    Odonto<span className="text-emerald-500">Pro</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-4">
                    <NavLinks />
                </nav>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button
                            className="text-black hover:bg-transparent"
                            variant="ghost"
                            size="icon"
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="w-[240px] sm:w-[300px] bg-white"
                    >
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription>
                                Veja nossos links
                            </SheetDescription>
                        </SheetHeader>

                        <nav className="flex flex-col space-y-4 mt-6">
                            <NavLinks />
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
