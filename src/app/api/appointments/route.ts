import { NextResponse } from 'next/server'
import { errorAction, successAction } from '@/lib/action-result'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const GET = auth(async function GET(request) {
    if (!request.auth) {
        return NextResponse.json(
            errorAction('Usuário não autenticado, acesso não autorizado.'),
            { status: 401 }
        )
    }

    const searchParams = request.nextUrl.searchParams
    const dateString = searchParams.get('date') as string

    const userId = request.auth?.user?.id

    if (!dateString) {
        return NextResponse.json(errorAction('Data não informada.'), {
            status: 400,
        })
    }

    if (!userId) {
        return NextResponse.json(errorAction('Usuário não autenticado.'), {
            status: 401,
        })
    }

    try {
        const [year, month, day] = dateString.split('-').map(Number)

        const parsedDate = new Date(Date.UTC(year, month - 1, day))

        if (
            !/^\d{4}-\d{2}-\d{2}$/.test(dateString) ||
            parsedDate.getUTCFullYear() !== year ||
            parsedDate.getUTCMonth() !== month - 1 ||
            parsedDate.getUTCDate() !== day
        ) {
            return NextResponse.json(errorAction('Data inválida.'), {
                status: 400,
            })
        }

        const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
        const endDate = new Date(
            Date.UTC(year, month - 1, day, 23, 59, 59, 999)
        )

        const appointments = await prisma.appointment.findMany({
            where: {
                userId,
                appointementDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                service: true,
            },
        })

        return NextResponse.json(successAction(appointments))
    } catch (error) {
        console.error(error)

        return NextResponse.json(errorAction('Falha ao buscar agendamentos.'), {
            status: 500,
        })
    }
})
