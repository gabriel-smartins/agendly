'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Plan } from '@/generated/prisma/enums'
import { getStripe } from '@/utils/stripe-js'
import { createSub } from '../_actions/create-sub'

interface SubButtonProps {
    plan: Plan
}

export function SubButton({ plan }: SubButtonProps) {
    async function handleBilling() {
        const { sessionId, url, error } = await createSub({ plan: plan })

        if (error) {
            toast.error(error.error)
            return
        }

        const stripe = await getStripe()

        if (stripe && url) {
            window.location.href = url
        }
    }

    return (
        <Button
            className={`w-full text-white bg-slate-950 hover:bg-slate-800 ${plan === 'PROFESSIONAL' && 'bg-emerald-500 hover:bg-emerald-400'}`}
            onClick={handleBilling}
        >
            Ativar assinatura
        </Button>
    )
}
