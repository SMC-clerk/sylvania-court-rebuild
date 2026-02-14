import { NewsItem } from "@/lib/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

export function NewsFeed({ news }: { news: NewsItem[] }) {
    if (!news || news.length === 0) return null

    return (
        <section className="bg-muted/30 py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-start gap-4 mb-10">
                    <h2 className="text-3xl font-bold tracking-tighter">Announcements</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {news.map((item, i) => (
                        <Card key={i} className="bg-background border-none shadow-sm">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <CalendarDays className="h-4 w-4" />
                                    <time>{item.date}</time>
                                </div>
                                <CardTitle className="leading-tight">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{item.summary}</p>
                                {item.link && (
                                    <a href={item.link} className="mt-4 inline-block text-sm font-medium text-primary hover:underline">Read more</a>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
