import { Footer } from './_components/footer'
import { Header } from './_components/header'
import { Hero } from './_components/hero'
import { ProfilesList } from './_components/profiles-list'
import { getProfiles } from './_data-access/get-profiles'

export const revalidate = 120

export default async function Home() {
    const result = await getProfiles()

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div>
                <Hero />
                <ProfilesList profiles={result.success ? result.data : []} />
                <Footer />
            </div>
        </div>
    )
}
