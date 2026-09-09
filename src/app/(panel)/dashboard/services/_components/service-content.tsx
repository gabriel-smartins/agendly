import { getAllServices } from '../_data-access/get-all-services'
import { ServicesList } from './services-list'

interface ServicesContentProps {
    userId: string
}

export async function ServiceContent({ userId }: ServicesContentProps) {
    const result = await getAllServices({ userId })

    return <ServicesList services={result.success ? result.data : []} />
}
