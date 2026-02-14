import Link from "next/link"
import { Menu } from "lucide-react"
import { getSiteData } from "@/lib/sheets"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export async function Header() {
    const data = await getSiteData()
    const title = data.globals.site_title || "Sylvania Municipal Court"

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/traffic", label: "Traffic" },
        { href: "/civil", label: "Civil" },
        { href: "/criminal", label: "Criminal" },
        { href: "/probation", label: "Probation" },
        { href: "/jury", label: "Jury Duty" },
        { href: "/contact", label: "Contact" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span className="text-lg tracking-tight">{title}</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-muted-foreground transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button size="sm" asChild>
                        <Link href="https://www.ohiolegalhelp.org/" target="_blank">Legal Help</Link>
                    </Button>
                </nav>

                {/* Mobile Nav */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <nav className="flex flex-col gap-4 mt-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-medium transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
