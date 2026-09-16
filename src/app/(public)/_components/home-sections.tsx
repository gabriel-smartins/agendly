import {
    ArrowRight,
    CalendarCheck2,
    CalendarRange,
    ChartNoAxesCombined,
    CheckCircle2,
    Clock3,
    Headphones,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    Store,
    UsersRound,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const categories = [
    'Consultoria e negócios',
    'Manutenção e reparos',
    'Beleza e bem-estar',
    'Aulas e treinamentos',
    'Serviços para empresas',
    'Atendimento especializado',
]

const benefits = [
    {
        icon: ShieldCheck,
        title: 'Profissionais confiáveis',
        description:
            'Encontre prestadores ativos e informações claras para escolher com mais segurança.',
    },
    {
        icon: Clock3,
        title: 'Agendamento sem complicação',
        description:
            'Veja os horários disponíveis e confirme seu atendimento em poucos passos.',
    },
    {
        icon: SlidersHorizontal,
        title: 'Mais organização',
        description:
            'Centralize serviços, horários e atendimentos em uma experiência simples.',
    },
]

export function HowItWorks() {
    const steps = [
        {
            icon: Search,
            number: '01',
            title: 'Encontre um serviço',
            description:
                'Explore profissionais e empresas que atendem ao que você precisa.',
        },
        {
            icon: CalendarCheck2,
            number: '02',
            title: 'Escolha um horário',
            description:
                'Confira a disponibilidade e selecione o melhor momento para você.',
        },
        {
            icon: CheckCircle2,
            number: '03',
            title: 'Confirme o agendamento',
            description:
                'Informe seus dados e receba a confirmação do atendimento.',
        },
    ]

    return (
        <section className="bg-white py-20" id="como-funciona">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Simples desde o primeiro passo
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                        Como funciona
                    </h2>
                    <p className="mt-4 text-slate-500">
                        Uma experiência direta para encontrar serviços e marcar
                        atendimentos com tranquilidade.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {steps.map((step) => {
                        const Icon = step.icon

                        return (
                            <article
                                key={step.number}
                                className="relative border-t border-slate-200 pt-6"
                            >
                                <div className="flex items-center justify-between">
                                    <Icon className="h-6 w-6 text-blue-600" />
                                    <span className="text-sm font-semibold text-slate-400">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                                    {step.title}
                                </h3>
                                <p className="mt-3 leading-7 text-slate-500">
                                    {step.description}
                                </p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export function ServiceCategories() {
    return (
        <section className="bg-slate-50 py-20" id="categorias">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div className="max-w-xl">
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                            Serviços para diferentes necessidades
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                            Encontre a solução certa para o seu momento
                        </h2>
                    </div>
                    <p className="max-w-md text-slate-500">
                        A plataforma conecta você a profissionais e negócios de
                        diferentes áreas, em um só lugar.
                    </p>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className="flex items-center gap-3 border border-slate-200 bg-white px-5 py-4 shadow-sm"
                        >
                            <span className="h-2 w-2 rounded-full bg-blue-600" />
                            <span className="font-medium text-slate-700">
                                {category}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function PlatformBenefits() {
    return (
        <section className="bg-white py-20" id="beneficios">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Feito para facilitar sua rotina
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                        Mais confiança em cada agendamento
                    </h2>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon

                        return (
                            <article
                                key={benefit.title}
                                className="border-l-2 border-blue-600 pl-6"
                            >
                                <Icon className="h-7 w-7 text-blue-600" />
                                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                                    {benefit.title}
                                </h3>
                                <p className="mt-3 leading-7 text-slate-500">
                                    {benefit.description}
                                </p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export function BusinessCta() {
    const businessBenefits = [
        {
            icon: CalendarRange,
            title: 'Agenda organizada',
            description: 'Apresente seus horários e facilite novas reservas.',
        },
        {
            icon: UsersRound,
            title: 'Mais visibilidade',
            description:
                'Mostre seus serviços para clientes em busca de soluções.',
        },
        {
            icon: ChartNoAxesCombined,
            title: 'Operação mais simples',
            description: 'Concentre sua rotina de atendimentos em um só lugar.',
        },
    ]

    return (
        <section className="bg-slate-900 py-20 text-white" id="para-negocios">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <Store className="h-8 w-8 text-blue-400" />
                        <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-blue-400">
                            Para empresas e prestadores
                        </p>
                        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                            Organize seus serviços em um só lugar
                        </h2>
                        <p className="mt-4 text-slate-300">
                            Tenha uma presença profissional, apresente seus
                            serviços e facilite o contato com seus clientes.
                        </p>
                    </div>
                    <Button
                        asChild
                        className="w-fit bg-blue-600 px-6 text-white hover:bg-blue-700"
                    >
                        <Link href="#como-funciona">
                            Conheça a plataforma
                            <ArrowRight />
                        </Link>
                    </Button>
                </div>

                <div className="mt-12 grid border-y border-slate-700 md:grid-cols-3">
                    {businessBenefits.map((benefit) => {
                        const Icon = benefit.icon

                        return (
                            <article
                                key={benefit.title}
                                className="border-slate-700 py-6 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                            >
                                <Icon className="h-6 w-6 text-blue-400" />
                                <h3 className="mt-4 font-semibold text-white">
                                    {benefit.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    {benefit.description}
                                </p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export function SupportNote() {
    return (
        <div className="flex items-center justify-center gap-2 border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-500">
            <Headphones className="h-4 w-4 text-blue-600" />
            <span>Uma experiência pensada para clientes e negócios.</span>
        </div>
    )
}
