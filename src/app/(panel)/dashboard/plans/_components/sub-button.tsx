'use client'

import { Loader } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Plan } from '@/generated/prisma/enums'
import { getStripe } from '@/utils/stripe-js'
import { createSub } from '../_actions/create-sub'

interface SubButtonProps {
    plan: Plan
}

export function SubButton({ plan }: SubButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleBilling() {
        setIsLoading(true)

        try {
            const response = await createSub({ plan })

            if (!response.success) {
                toast.error(response.error)
                return
            }

            const stripe = await getStripe()

            if (stripe && response.data.url) {
                window.location.href = response.data.url
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            className={`w-full text-white bg-slate-800 hover:bg-slate-700 ${plan === 'PROFESSIONAL' && 'bg-blue-600 hover:bg-blue-700'}`}
            onClick={handleBilling}
            disabled={isLoading}
        >
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Ativando assinatura...' : 'Ativar assinatura'}
        </Button>
    )
}
