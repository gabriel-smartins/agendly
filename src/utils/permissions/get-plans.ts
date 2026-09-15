'use server'

import { Plan } from '@/generated/prisma/enums'
import { PLANS, PlanProps } from '../plans'

interface PlanDetailInfo {
    services: number
}

const PLANS_LIMITS: PlanProps = {
    BASIC: {
        services: PLANS.BASIC.services,
    },
    PROFESSIONAL: {
        services: PLANS.PROFESSIONAL.services,
    },
}

export async function getPlan(plan: Plan) {
    return PLANS[plan]
}
