import { faker } from '@faker-js/faker'
import prisma from '@/lib/prisma'

const cities = [
    'Brasília, DF',
    'Águas Claras, DF',
    'Taguatinga, DF',
    'Goiânia, GO',
    'São Paulo, SP',
]

const businessTypes = [
    {
        prefix: 'Clínica Odontológica',
        services: [
            { name: 'Limpeza dental', price: 15000, duration: 30 },
            { name: 'Consulta de avaliação', price: 8000, duration: 30 },
            { name: 'Canal', price: 45000, duration: 90 },
            { name: 'Extração', price: 25000, duration: 45 },
            { name: 'Clareamento', price: 35000, duration: 60 },
        ],
    },
    {
        prefix: 'Barbearia',
        services: [
            { name: 'Corte de cabelo', price: 4000, duration: 30 },
            { name: 'Barba', price: 3000, duration: 20 },
            { name: 'Corte + barba', price: 6500, duration: 45 },
            { name: 'Sobrancelha', price: 1500, duration: 15 },
        ],
    },
    {
        prefix: 'Studio de Beleza',
        services: [
            { name: 'Manicure', price: 3500, duration: 45 },
            { name: 'Pedicure', price: 4000, duration: 45 },
            { name: 'Design de sobrancelha', price: 3000, duration: 30 },
            { name: 'Escova', price: 5000, duration: 60 },
        ],
    },
    {
        prefix: 'Clínica de Fisioterapia',
        services: [
            { name: 'Avaliação fisioterapêutica', price: 12000, duration: 60 },
            { name: 'Sessão de fisioterapia', price: 9000, duration: 50 },
            { name: 'RPG', price: 11000, duration: 60 },
            { name: 'Pilates terapêutico', price: 8000, duration: 50 },
        ],
    },
    {
        prefix: 'Espaço de Psicologia',
        services: [
            {
                name: 'Sessão de terapia individual',
                price: 15000,
                duration: 50,
            },
            { name: 'Primeira consulta', price: 10000, duration: 60 },
            { name: 'Terapia de casal', price: 20000, duration: 60 },
        ],
    },
    {
        prefix: 'Personal Trainer',
        services: [
            { name: 'Avaliação física', price: 8000, duration: 60 },
            { name: 'Treino individual', price: 7000, duration: 60 },
            { name: 'Treino em dupla', price: 5000, duration: 60 },
        ],
    },
    {
        prefix: 'Pet Shop e Banho & Tosa',
        services: [
            { name: 'Banho', price: 5000, duration: 40 },
            { name: 'Tosa higiênica', price: 4000, duration: 30 },
            { name: 'Banho + tosa completa', price: 9000, duration: 60 },
        ],
    },
    {
        prefix: 'Clínica de Estética',
        services: [
            { name: 'Limpeza de pele', price: 12000, duration: 60 },
            { name: 'Drenagem linfática', price: 10000, duration: 50 },
            { name: 'Massagem relaxante', price: 9000, duration: 50 },
        ],
    },
]

const times = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
]

async function main() {
    for (let i = 0; i < 10; i++) {
        const business = faker.helpers.arrayElement(businessTypes)
        const name = `${business.prefix} ${faker.company.name()}`
        const email = faker.internet
            .email({ provider: 'example.com' })
            .toLowerCase()

        const profile = await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                name,
                email,
                emailVerified: new Date(),
                image: `https://i.pravatar.cc/300?u=${email}`,
                address: `${faker.location.streetAddress()}, ${faker.helpers.arrayElement(cities)}`,
                status: true,
                times,
                services: {
                    create: faker.helpers.arrayElements(business.services, {
                        min: 2,
                        max: business.services.length,
                    }),
                },
                subscription: {
                    create: {
                        status: 'active',
                        plan: 'PROFESSIONAL',
                        priceId: process.env.STRIPE_PRO as string,
                    },
                },
            },
        })

        console.log(`Criado: ${profile.name} (${profile.email})`)
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
