'use client'

import { LinkIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface ButtonCopyLinkPros {
    userId: string
}

export function ButtonCopyLink({ userId }: ButtonCopyLinkPros) {
    async function handleCopyLink() {
        await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/scheduling/${userId}`
        )

        toast.success('Link de agendamento copiado com sucesso!')
    }

    return (
        <Button
            className="bg-slate-800 hover:bg-slate-700"
            onClick={handleCopyLink}
        >
            <LinkIcon className="w-5 h-5 text-white" />
        </Button>
    )
}
