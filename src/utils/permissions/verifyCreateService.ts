'use server'

import { Session } from 'next-auth'
import { Subscription } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { PLANS } from '../plans'
import { getPlan } from './get-plans'
import { ResponsePermissionProp } from './hasPermission'
import { verifySubscriptionExpired } from './verifySubscriptionExpired'

interface VerifyCreateServiceProps {
    subscription: Subscription | null
    session: Session
}

export async function verifyCreateService({
    subscription,
    session,
}: VerifyCreateServiceProps): Promise<ResponsePermissionProp> {
    try {
        const serviceCount = await prisma.service.count({
            where: {
                userId: session?.user?.id,
                status: true,
            },
        })

        if (subscription && subscription.status === 'active') {
            const plan = subscription.plan

            const planPermissions = await getPlan(plan)

            return {
                hasPermission:
                    planPermissions.services === null ||
                    serviceCount < planPermissions.services,
                planId: subscription.plan,
                expired: false,
                plan: PLANS[subscription.plan],
            }
        }

        const verifyTestLimit = await verifySubscriptionExpired(session)

        return verifyTestLimit
    } catch (error) {
        console.error(error)

        return {
            hasPermission: false,
            planId: 'EXPIRED',
            expired: true,
            plan: null,
        }
    }
}
