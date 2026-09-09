import { Clinics } from './_components/clinics'
import { Footer } from './_components/footer'
import { Header } from './_components/header'
import { Hero } from './_components/hero'
import { getProfessionals } from './_data-access/get-professionals'

export const revalidate = 120

export default async function Home() {
    const result = await getProfessionals()

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div>
                <Hero />
                <Clinics professionals={result.success ? result.data : []} />
                <Footer />
            </div>
        </div>
    )
}
