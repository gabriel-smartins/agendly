'use client'

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
import { LogIn, Menu } from 'lucide-react'
import Link from 'next/link'

export function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const session = null

    const navItems = [{ href: '#profissionais', label: 'Profissionais' }]

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
                    className="flex items-center gap-2 justify-center"
                >
                    Acessar clínica
                </Link>
            ) : (
                <Button>
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
