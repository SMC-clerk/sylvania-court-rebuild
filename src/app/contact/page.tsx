import { getSiteData } from "@/lib/sheets"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Phone, Mail } from "lucide-react"

export const revalidate = 60

export default async function ContactPage() {
    const data = await getSiteData()
    const { globals, hours } = data

    return (
        <div className="container py-24 px-4 md:px-6 max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-12 text-center">Contact & Hours</h1>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-semibold mb-6">Court Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <p className="font-medium">Address</p>
                                    <p className="text-muted-foreground">{globals.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-muted-foreground">{globals.phone_main}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-muted-foreground">clerk@sylvaniacourt.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <Card className="overflow-hidden h-64 bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground">Google Map Embed Would Go Here</p>
                    </Card>
                </div>

                {/* Hours */}
                <div>
                    <h3 className="text-2xl font-semibold mb-6">Office Hours</h3>
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            {hours.length > 0 ? hours.map((h, i) => (
                                <div key={i} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                                    <span className="font-medium w-24">{h.day}</span>
                                    <div className="flex flex-col items-end">
                                        <span>{h.open_time} - {h.close_time}</span>
                                        {h.note && <span className="text-xs text-muted-foreground">{h.note}</span>}
                                    </div>
                                </div>
                            )) : (
                                <p className="text-muted-foreground">Hours not available.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
