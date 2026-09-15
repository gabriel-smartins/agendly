'use client'

import { LinkIcon, Loader } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface ButtonCopyLinkPros {
    userId: string
}

export function ButtonCopyLink({ userId }: ButtonCopyLinkPros) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleCopyLink() {
        setIsLoading(true)

        try {
            await navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_URL}/scheduling/${userId}`
            )

            toast.success('Link de agendamento copiado com sucesso!')
        } catch {
            toast.error('Não foi possível copiar o link de agendamento.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            className="bg-slate-800 hover:bg-slate-700"
            onClick={handleCopyLink}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader className="h-5 w-5 animate-spin text-white" />
            ) : (
                <LinkIcon className="h-5 w-5 text-white" />
            )}
        </Button>
    )
}
