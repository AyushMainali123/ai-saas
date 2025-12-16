import { Badge } from "@/components/ui/badge";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";


const STATS = [
    { label: "AI-Powered", value: "Real-time" },
    { label: "Smart Transcripts", value: "Automated" },
    { label: "Agents", value: "Customizable" },
]


export function LandingHero() {
    return (
        <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <Badge className="mb-6 border-primary/20 bg-primary/10 text-primary shadow-sm" variant="outline">
                        <SparklesIcon className="mr-1 size-3" />
                        AI-Powered Meeting Platform
                    </Badge>
                    <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Conduct Intelligent Video Meetings with{" "}
                        <span className="bg-linear-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                            AI Agents
                        </span>
                    </h1>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                        Create custom AI agents, schedule meetings, and leverage real-time AI capabilities during video calls.
                        Transform your meetings with automated transcription, intelligent summaries, and AI-powered insights.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href="/auth/signup">
                            <Button size="lg" className="group gap-2 shadow-xl shadow-primary/30">
                                Start Free Trial
                                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button size="lg" variant="outline">
                                See How It Works
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
                        {STATS.map((stat) => (
                            <div key={stat.label} className="rounded-lg border bg-card/50 p-4 backdrop-blur-sm">
                                <div className="mb-1 text-2xl font-bold text-primary">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}