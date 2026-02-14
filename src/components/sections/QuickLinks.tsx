"use client"

import Link from "next/link"
import { ArrowRight, Car, Scale, UserCheck, Gavel, FileText, BadgeInfo, Building2, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Service } from "@/lib/types"

// Map string names to Lucide components
const IconMap: Record<string, React.ComponentType<any>> = {
    traffic: Car,
    civil: Scale,
    probation: UserCheck,
    jury: Gavel,
    forms: FileText,
    info: BadgeInfo,
    building: Building2,
    default: MapPin,
}

export function QuickLinks({ services }: { services: Service[] }) {
    // Fallback services if sheet is empty
    const displayServices = services.length > 0 ? services : [
        { id: "traffic", title: "Traffic Division", description: "Pay tickets, view court schedules, and traffic rights.", icon: "traffic", link: "/traffic", category: "main" },
        { id: "civil", title: "Civil Division", description: "Small claims, evictions, and trusteeships.", icon: "civil", link: "/civil", category: "main" },
        { id: "probation", title: "Probation", description: "Reporting instructions and officer contacts.", icon: "probation", link: "/probation", category: "main" },
        { id: "jury", title: "Jury Duty", description: "Check your juror status and reporting instructions.", icon: "jury", link: "/jury", category: "main" },
    ]

    return (
        <section className="container mx-auto py-24 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Court Divisions & Services</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                    Access specific court departments and information online.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayServices.map((service) => {
                    const Icon = IconMap[service.icon.toLowerCase()] || IconMap.default

                    return (
                        <Card key={service.id} className="w-full max-w-[350px] border shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">{service.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Link href={service.link} className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                                    Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    <span className="absolute inset-0"></span>
                                </Link>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </section>
    )
}
