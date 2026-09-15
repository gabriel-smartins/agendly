import { LabelSubscription } from '@/components/ui/label-subscription'
import { hasPermission } from '@/utils/permissions/hasPermission'
import { getAllServices } from '../_data-access/get-all-services'
import { ServicesList } from './services-list'

interface ServicesContentProps {
    userId: string
}

export async function ServiceContent({ userId }: ServicesContentProps) {
    const result = await getAllServices({ userId })
    const permissions = await hasPermission({ type: 'service' })

    console.log(permissions)

    return (
        <>
            {!permissions.hasPermission && (
                <LabelSubscription expired={permissions.expired} />
            )}
            <ServicesList
                services={result.success ? result.data : []}
                permission={permissions}
            />
        </>
    )
}
