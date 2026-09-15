export type PlanServicesProps = {
    services: number
}

export type PlanProps = {
    BASIC: PlanServicesProps
    PROFESSIONAL: PlanServicesProps
}

export const PLANS: PlanProps = {
    BASIC: {
        services: 12,
    },
    PROFESSIONAL: {
        services: 999,
    },
}

export const subscriptionPlans = [
    {
        id: 'BASIC',
        name: 'Basic',
        description: 'Plano inicial para perfis pequenos',
        price: 'R$ 67,90',
        promoPrice: 'R$ 27,90',
        features: [
            `Até ${PLANS['BASIC'].services} serviços`,
            `Agendamentos ilimitados`,
            `Suporte`,
            `Relatórios`,
        ],
    },

    {
        id: 'PROFESSIONAL',
        name: 'Professional',
        description: 'Plano ideal para perfis maiores',
        price: 'R$ 187,90',
        promoPrice: 'R$ 97,90',
        features: [
            `Serviços ilimitados`,
            `Agendamentos ilimitados`,
            `Suporte prioritário`,
            `Relatórios avançados`,
        ],
    },
]
