import { Footer } from './_components/footer'
import { Header } from './_components/header'
import { Hero } from './_components/hero'
import { ProfilesList } from './_components/profiles-list'
import { getProfiles } from './_data-access/get-profiles'

export const revalidate = 120

function selectFeaturedProfiles<T>(profiles: T[], limit: number) {
    const shuffledProfiles = [...profiles]

    for (let index = shuffledProfiles.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        ;[shuffledProfiles[index], shuffledProfiles[randomIndex]] = [
            shuffledProfiles[randomIndex],
            shuffledProfiles[index],
        ]
    }

    return shuffledProfiles.slice(0, limit)
}

export default async function Home() {
    const result = await getProfiles()

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div>
                <Hero />
                <ProfilesList
                    profiles={
                        result.success
                            ? selectFeaturedProfiles(result.data, 4)
                            : []
                    }
                />
                <Footer />
            </div>
        </div>
    )
}
