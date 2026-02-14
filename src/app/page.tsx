import { getSiteData } from "@/lib/sheets"
import { Hero } from "@/components/sections/Hero"
import { QuickLinks } from "@/components/sections/QuickLinks"
import { NewsFeed } from "@/components/sections/NewsFeed"

export const revalidate = 60 // Global revalidate as fallback

export default async function Home() {
  const data = await getSiteData()

  const alertActive = data.globals.alert_active === "TRUE"
  const alertText = data.globals.alert_text

  return (
    <>
      <Hero
        heading={data.globals.hero_heading || "Justice with Integrity"}
        subheading="Serving the community of Sylvania, Ohio with fairness, integrity, and accessibility."
        alert={alertActive ? { active: true, text: alertText } : undefined}
      />
      <QuickLinks services={data.services} />
      <NewsFeed news={data.news} />
    </>
  )
}
