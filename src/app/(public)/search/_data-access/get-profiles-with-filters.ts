'use server'

import { errorAction, successAction } from '@/lib/action-result'
import prisma from '@/lib/prisma'

interface GetProfilesWithFiltersParams {
    name?: string
    service?: string
}

export async function getProfilesWithFilters({
    name,
    service,
}: GetProfilesWithFiltersParams) {
    try {
        const profiles = await prisma.user.findMany({
            where: {
                status: true,

                name: name
                    ? {
                          contains: name,
                          mode: 'insensitive',
                      }
                    : undefined,

                services: service
                    ? {
                          some: {
                              name: {
                                  contains: service,
                                  mode: 'insensitive',
                              },
                          },
                      }
                    : undefined,
            },

            include: {
                services: {
                    where: {
                        status: true,
                    },
                },
            },

            orderBy: {
                createdAt: 'desc',
            },
        })

        return successAction(profiles)
    } catch (error) {
        console.error(error)

        return errorAction('Falha ao buscar perfis.')
    }
}
