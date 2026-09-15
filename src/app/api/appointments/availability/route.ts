import { NextRequest, NextResponse } from 'next/server'
import { errorAction, successAction } from '@/lib/action-result'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl

    const userId = searchParams.get('userId')
    const dateParam = searchParams.get('date')

    if (!userId || userId === 'null' || !dateParam || dateParam === 'null') {
        return NextResponse.json(
            errorAction('Os parâmetros de usuário e data são obrigatórios.'),
            {
                status: 400,
            }
        )
    }

    try {
        const [year, month, day] = dateParam.split('-').map(Number)

        const parsedDate = new Date(Date.UTC(year, month - 1, day))

        if (
            !/^\d{4}-\d{2}-\d{2}$/.test(dateParam) ||
            parsedDate.getUTCFullYear() !== year ||
            parsedDate.getUTCMonth() !== month - 1 ||
            parsedDate.getUTCDate() !== day
        ) {
            return NextResponse.json(errorAction('Data inválida.'), {
                status: 400,
            })
        }

        const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
        const endDate = new Date(
            Date.UTC(year, month - 1, day, 23, 59, 59, 999)
        )

        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
        })

        if (!user) {
            return NextResponse.json(
                errorAction('Nenhum usuário encontrado.'),
                {
                    status: 404,
                }
            )
        }

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

        const blockedSlots = new Set<string>()

        for (const apt of appointments) {
            const requiredSlots = Math.ceil(apt.service.duration / 30)
            const startIndex = user.times.indexOf(apt.time)

            if (startIndex !== -1) {
                for (let i = 0; i < requiredSlots; i++) {
                    const blockedSlot = user.times[startIndex + i]
                    if (blockedSlot) {
                        blockedSlots.add(blockedSlot)
                    }
                }
            }
        }

        const blockedTimes = Array.from(blockedSlots)

        return NextResponse.json(successAction(blockedTimes))
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            errorAction('Falha ao buscar horários disponíveis.'),
            {
                status: 500,
            }
        )
    }
}
