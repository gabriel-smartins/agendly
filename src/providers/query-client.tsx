'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface QueryClientContextProps {
    children: React.ReactNode
}

export function QueryClientContext({ children }: QueryClientContextProps) {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
