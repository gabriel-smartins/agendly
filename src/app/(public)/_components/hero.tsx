import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import heroBackgroundImage from '@/../public/hero.jpg'
import { Button } from '@/components/ui/button'

export function Hero() {
    return (
        <section className="relative flex min-h-[600px] items-center">
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroBackgroundImage}
                    alt="Grupo corporativo"
                    fill
                    className="object-cover object-center"
                    quality={100}
                    priority
                    sizes="100vw"
                />
            </div>

            <div className="container relative z-10 mx-auto px-4 py-20 sm:px-6 lg:px-8">
                <main className="flex items-center justify-start">
                    <article className="max-w-2xl flex flex-col justify-center space-y-6 rounded-3xl border border-white/50 bg-white/60 p-8 shadow-xl backdrop-blur-md md:p-12">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
                            Encontre os melhores profissionais em um único
                            local!
                        </h1>

                        <p className="text-base font-medium text-slate-800 md:text-lg">
                            Uma plataforma confiável para conectar empresas e
                            clientes, simplificar operações e transformar a
                            gestão de serviços em uma experiência mais ágil e
                            organizada.
                        </p>

                        <Button
                            asChild
                            className="w-fit bg-blue-600 px-8 py-6 text-lg font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
                        >
                            <Link href="/search">
                                Profissionais disponíveis
                                <Search className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </article>
                </main>
            </div>
        </section>
    )
}
