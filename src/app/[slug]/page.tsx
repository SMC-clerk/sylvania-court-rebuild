import { getSiteData } from "@/lib/sheets"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export async function generateStaticParams() {
    const data = await getSiteData()
    return data.services.map((service) => ({
        slug: service.link.replace(/^\//, ""), // remove leading slash
    }))
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const data = await getSiteData()

    // Find service where link matches /slug
    const service = data.services.find(s => s.link === `/${slug}` || s.id === slug)

    if (!service) {
        notFound()
    }

    return (
        <div className="container py-24 px-4 md:px-6 max-w-4xl mx-auto">
            <Button variant="ghost" className="mb-8 pl-0" asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Link>
            </Button>

            <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">{service.title}</h1>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {service.description}
                    </p>
                    <hr className="my-8 border-muted" />
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <h3 className="font-semibold mb-4">Contact {service.title}</h3>
                        <p className="text-sm text-muted-foreground">
                            For inquiries related to {service.title}, please contact the clerk's office at {data.globals.phone_main}.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
