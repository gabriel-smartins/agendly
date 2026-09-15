'use server'

import { addDays, isAfter } from 'date-fns'
import { Session } from 'next-auth'
import { ResponsePermissionProp } from './hasPermission'

export async function verifySubscriptionExpired(
    session: Session
): Promise<ResponsePermissionProp> {
    const TRIAL_DAYS = 3

    const trialEndDate = addDays(session?.user?.createdAt!, TRIAL_DAYS)

    if (isAfter(new Date(), trialEndDate)) {
        return {
            hasPermission: false,
            planId: 'EXPIRED',
            expired: true,
            plan: null,
        }
    }

    return {
        hasPermission: true,
        planId: 'TRIAL',
        expired: false,
        plan: null,
    }
}
