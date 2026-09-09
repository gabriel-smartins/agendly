import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const GET = auth(async function GET(request) {
    if (!request.auth) {
        return NextResponse.json(
            { error: 'Usuário não autenticado, acesso não autorizado.' },
            { status: 401 }
        )
    }

    const searchParams = request.nextUrl.searchParams
    const dateString = searchParams.get('date') as string

    const clinicId = request.auth?.user?.id

    if (!dateString) {
        return NextResponse.json(
            { error: 'Data não informada!' },
            { status: 400 }
        )
    }

    if (!clinicId) {
        return NextResponse.json(
            { error: 'Usuário não encontrado!' },
            { status: 404 }
        )
    }

    try {
        const [year, month, day] = dateString.split('-').map(Number)

        const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
        const endDate = new Date(
            Date.UTC(year, month - 1, day, 23, 59, 59, 999)
        )

        const appointments = await prisma.appointment.findMany({
            where: {
                userId: clinicId,
                appointementDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                service: true,
            },
        })

        return NextResponse.json(appointments)
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { error: 'Falha ao buscar agendamentos.' },
            { status: 400 }
        )
    }
})
