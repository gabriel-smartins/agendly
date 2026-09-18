'use client'

import clsx from 'clsx'
import {
    Banknote,
    CalendarCheck2,
    ChevronLeft,
    ChevronRight,
    Folder,
    Home,
    List,
    Loader2,
    Settings,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

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
                <div className="mb-6 mt-4 flex justify-center">
                    {!isCollapsed && (
                        <Link
                            href="/"
                            className="inline-block text-2xl font-extrabold tracking-tight text-slate-700"
                        >
                            Agend
                            <span className="text-blue-600">ly</span>
                        </Link>
                    )}
                </div>

                <Button
                    className="bg-slate-100 hover:bg-slate-50 text-slate-800 self-end"
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
                            href="/"
                            icon={<Home />}
                            label="Home"
                            pathName={pathName}
                            isCollasped={isCollapsed}
                        />

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
                            <span className="text-sm text-slate-400 font-medium mt-1 uppercase">
                                Painel
                            </span>

                            <SidebarLinks
                                href="/"
                                icon={<Home />}
                                label="Home"
                                pathName={pathName}
                                isCollasped={isCollapsed}
                            />

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

                            <span className="text-sm text-slate-400 font-medium mt-1 uppercase">
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
                                    onClick={() => setIsCollapsed(false)}
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
                                    href="/"
                                    icon={<Home />}
                                    label="Home"
                                    pathName={pathName}
                                    isCollasped={isCollapsed}
                                />

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
    const [pendingHref, setPendingHref] = useState<string | null>(null)

    useEffect(() => {
        if (pathName === pendingHref) {
            setPendingHref(null)
        }
    }, [pathName, pendingHref])

    const isLoading = pendingHref === href && pathName !== href

    return (
        <Link
            href={href}
            aria-current={pathName === href ? 'page' : undefined}
            aria-busy={isLoading}
            onClick={() => {
                if (pathName !== href) {
                    setPendingHref(href)
                }
            }}
        >
            <div
                className={clsx(
                    'flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-200',
                    {
                        'text-white bg-blue-600': pathName === href,
                        'text-slate-700 hover:bg-blue-50 hover:text-blue-700':
                            pathName !== href,
                        'pointer-events-none opacity-70': isLoading,
                    }
                )}
            >
                <span className="w-6 h-6">{icon}</span>
                {!isCollasped && (
                    <span className="flex items-center gap-2">
                        {label}
                        {isLoading && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                    </span>
                )}
                {isCollasped && isLoading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                )}
            </div>
        </Link>
    )
}
