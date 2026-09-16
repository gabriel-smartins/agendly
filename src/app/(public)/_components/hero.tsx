import Image from 'next/image'
import heroBackgroundImage from '@/../public/hero.jpg'
import { Button } from '@/components/ui/button'

export function Hero() {
    return (
        <section className="relative min-h-[600px] flex items-center">
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
                    <article className="max-w-2xl flex flex-col justify-center space-y-6 bg-white/60 backdrop-blur-md border border-white/50 p-8 md:p-12 rounded-3xl shadow-xl">
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                            Encontre os melhores profissionais em um único
                            local!
                        </h1>

                        <p className="text-base md:text-lg text-slate-800 font-medium">
                            Uma plataforma confiável para conectar empresas e
                            clientes, simplificar operações e transformar a
                            gestão de serviços em uma experiência mais ágil e
                            organizada.
                        </p>

                        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-fit px-8 py-6 text-lg font-semibold shadow-md transition-colors">
                            Profissionais disponíveis
                        </Button>
                    </article>
                </main>
            </div>
        </section>
    )
}
