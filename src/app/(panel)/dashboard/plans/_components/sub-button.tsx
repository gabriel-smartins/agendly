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
        const response = await createSub({ plan })

        if (!response.success) {
            toast.error(response.error)
            return
        }

        const stripe = await getStripe()

        if (stripe && response.data.url) {
            window.location.href = response.data.url
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
