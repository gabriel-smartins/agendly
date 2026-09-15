'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { verifyCreateService } from './verifyCreateService'

export type PLAN_PROP = 'BASIC' | 'PROFESSIONAL' | 'TRIAL' | 'EXPIRED'

interface PlanDetailInfo {
    services: number
}

export interface ResponsePermissionProp {
    hasPermission: boolean
    planId: PLAN_PROP
    expired: boolean
    plan: PlanDetailInfo | null
}

interface HasPermissionProps {
    type: string
}

export async function hasPermission({
    type,
}: HasPermissionProps): Promise<ResponsePermissionProp> {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
        return {
            hasPermission: false,
            planId: 'EXPIRED',
            expired: true,
            plan: null,
        }
    }

    const subscription = await prisma.subscription.findUnique({
        where: {
            userId,
        },
    })

    switch (type) {
        case 'service':
            const permission = await verifyCreateService({
                subscription,
                session,
            })

            return permission

        default:
            return {
                hasPermission: false,
                planId: 'EXPIRED',
                expired: true,
                plan: null,
            }
    }
}
