import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'

export default async function Dashboard() {
    const session = await getSession()

    if (!session) {
        redirect('/')
    }

    return (
        <div>
            <div className="w-full h-[600px] bg-gray-200 mb-10"></div>
            <div className="w-full h-[600px] bg-gray-500 mb-10"></div>
        </div>
    )
}
