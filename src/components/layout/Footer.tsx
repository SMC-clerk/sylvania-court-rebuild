import Link from "next/link"
import { getSiteData } from "@/lib/sheets"

export async function Footer() {
    const data = await getSiteData()
    const year = new Date().getFullYear()

    // Fallback defaults if global data is missing
    const address = data.globals.address || "6700 Monroe St, Sylvania, OH 43560"
    const phone = data.globals.phone_main || "419-885-8975"

    return (
        <footer className="border-t py-12 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-8 text-sm">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">Sylvania Municipal Court</h3>
                        <p className="text-muted-foreground">{address}</p>
                        <p className="text-muted-foreground">{phone}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 md:gap-12">
                        <div className="flex flex-col gap-2">
                            <h4 className="font-medium">Departments</h4>
                            <Link href="/traffic" className="text-muted-foreground hover:text-primary transition-colors">Traffic</Link>
                            <Link href="/criminal" className="text-muted-foreground hover:text-primary transition-colors">Criminal</Link>
                            <Link href="/civil" className="text-muted-foreground hover:text-primary transition-colors">Civil</Link>
                            <Link href="/probation" className="text-muted-foreground hover:text-primary transition-colors">Probation</Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">© {year} Sylvania Municipal Court. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Accessibility</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
