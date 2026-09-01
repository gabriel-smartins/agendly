'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
    Banknote,
    CalendarCheck2,
    ChevronLeft,
    ChevronRight,
    Folder,
    List,
    Settings,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import logoImage from '@/../public/logo-odonto.png'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
    const pathName = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className="flex min-h-screen w-full">
            <aside
                className={clsx(
                    'flex flex-col border-r bg-background transition-all duration-300 p-4 h-full',
                    {
                        'w-20': isCollapsed,
                        'w-64': !isCollapsed,
                        'hidden md:flex md:fixed': true,
                    }
                )}
            >
                <div className="mb-6 mt-4">
                    {!isCollapsed && (
                        <Image
                            src={logoImage}
                            alt="Logo"
                            priority
                            quality={100}
                        />
                    )}
                </div>

                <Button
                    className="bg-gray-100 hover-bg-gray-50 text-zinc-900 self-end"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {!isCollapsed ? (
                        <ChevronLeft className="w-12 h-12" />
                    ) : (
                        <ChevronRight className="w-12 h-12" />
                    )}
                </Button>

                {isCollapsed && (
                    <nav className="flex flex-col gap-1 overflow-hidden mt-2">
                        <SidebarLinks
                            href="/dashboard"
                            icon={<CalendarCheck2 />}
                            label="Agendamentos"
                            pathName={pathName}
                            isCollasped={isCollapsed}
                        />

                        <SidebarLinks
                            href="/dashboard/services"
                            icon={<Folder />}
                            label="Serviços"
                            pathName={pathName}
                            isCollasped={isCollapsed}
                        />

                        <SidebarLinks
                            href="/dashboard/profile"
                            icon={<Settings />}
                            label="Meu perfil"
                            pathName={pathName}
                            isCollasped={isCollapsed}
                        />

                        <SidebarLinks
                            href="/dashboard/plans"
                            icon={<Banknote />}
                            label="Planos"
                            pathName={pathName}
                            isCollasped={isCollapsed}
                        />
                    </nav>
                )}

                <Collapsible open={!isCollapsed}>
                    <CollapsibleContent>
                        <nav className="flex flex-col gap-1 overflow-hidden">
                            <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                                Painel
                            </span>

                            <SidebarLinks
                                href="/dashboard"
                                icon={<CalendarCheck2 />}
                                label="Agendamentos"
                                pathName={pathName}
                                isCollasped={isCollapsed}
                            />

                            <SidebarLinks
                                href="/dashboard/services"
                                icon={<Folder />}
                                label="Serviços"
                                pathName={pathName}
                                isCollasped={isCollapsed}
                            />

                            <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                                Configurações
                            </span>

                            <SidebarLinks
                                href="/dashboard/profile"
                                icon={<Settings />}
                                label="Meu perfil"
                                pathName={pathName}
                                isCollasped={isCollapsed}
                            />

                            <SidebarLinks
                                href="/dashboard/plans"
                                icon={<Banknote />}
                                label="Planos"
                                pathName={pathName}
                                isCollasped={isCollapsed}
                            />
                        </nav>
                    </CollapsibleContent>
                </Collapsible>
            </aside>

            <div
                className={clsx(
                    'flex flex-1 flex-col transition-all duration-300',
                    {
                        'md:ml-20': isCollapsed,
                        'md:ml-64': !isCollapsed,
                    }
                )}
            >
                <header className="md:hidden flex items-center justify-between border-b px-2 md:px-6 h-14 z-10 sticky top-0 bg-white">
                    <Sheet>
                        <div className="flex items-center gap-4">
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="md:hidden"
                                >
                                    <List className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <h1 className="text-base md:text-lg font-semibold">
                                Menu OdontoPRO
                            </h1>
                        </div>

                        <SheetContent className="w-[240px] sm:w-[300px] bg-white">
                            <SheetTitle>OdontoPRO</SheetTitle>
                            <SheetDescription>
                                Menu administrativo
                            </SheetDescription>

                            <nav className="grid gap-2 text-base pt-5">
                                <SidebarLinks
                                    href="/dashboard"
                                    icon={<CalendarCheck2 />}
                                    label="Agendamentos"
                                    pathName={pathName}
                                    isCollasped={isCollapsed}
                                />

                                <SidebarLinks
                                    href="/dashboard/services"
                                    icon={<Folder />}
                                    label="Serviços"
                                    pathName={pathName}
                                    isCollasped={isCollapsed}
                                />

                                <SidebarLinks
                                    href="/dashboard/profile"
                                    icon={<Settings />}
                                    label="Meu perfil"
                                    pathName={pathName}
                                    isCollasped={isCollapsed}
                                />

                                <SidebarLinks
                                    href="/dashboard/plans"
                                    icon={<Banknote />}
                                    label="Planos"
                                    pathName={pathName}
                                    isCollasped={isCollapsed}
                                />
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>
                <main className="flex-1 p-4 px-2 md:p-6">{children}</main>
            </div>
        </div>
    )
}

interface SidebarLinkProps {
    href: string
    icon: React.ReactNode
    label: string
    pathName: string
    isCollasped: boolean
}

function SidebarLinks({
    href,
    icon,
    label,
    pathName,
    isCollasped,
}: SidebarLinkProps) {
    return (
        <Link href={href}>
            <div
                className={clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
                    {
                        'text-white bg-blue-500': pathName === href,
                        'text-gray-700 hover:bg-gray-200': pathName !== href,
                    }
                )}
            >
                <span className="w-6 h-6">{icon}</span>
                {!isCollasped && <span>{label}</span>}
            </div>
        </Link>
    )
}
