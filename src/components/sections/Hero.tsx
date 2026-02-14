"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
    heading: string
    subheading?: string
    alert?: {
        active: boolean
        text: string
    }
}

export function Hero({ heading, subheading, alert }: HeroProps) {
    return (
        <section className="relative flex flex-col items-center justify-center py-24 md:py-32 overflow-hidden bg-background">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
                {alert?.active && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm text-orange-800"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-orange-600 mr-2"></span>
                        {alert.text}
                    </motion.div>
                )}

                <motion.h1
                    className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {heading}
                </motion.h1>

                <motion.p
                    className="mt-6 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {subheading || "Serving the community of Sylvania, Ohio with fairness, integrity, and accessibility."}
                </motion.p>

                <motion.div
                    className="mt-8 flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Button size="lg" asChild>
                        <Link href="/services">
                            Access Court Services <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/contact">
                            Contact Us
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
