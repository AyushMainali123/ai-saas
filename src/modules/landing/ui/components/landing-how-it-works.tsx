import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon, CalendarIcon, Users2Icon, ZapIcon } from "lucide-react";

const STEPS = [
    {
        step: "01",
        title: "Create Your AI Agent",
        description: "Define your AI agent's personality, instructions, and capabilities. Customize it to match your meeting needs.",
        icon: Users2Icon,
    },
    {
        step: "02",
        title: "Schedule a Meeting",
        description: "Set up your video meeting and assign your AI agent. Invite participants and let the AI prepare.",
        icon: CalendarIcon,
    },
    {
        step: "03",
        title: "Meet & Analyze",
        description: "Conduct your meeting with real-time AI assistance. Get instant transcripts, summaries, and insights.",
        icon: ZapIcon,
    },
]


export function LandingHowItWorks() {
    return (
        <section id="how-it-works" className="bg-muted/30 py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary" variant="outline">
                        How It Works
                    </Badge>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                        Get Started in Minutes
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Simple steps to transform your meetings with AI
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-8 md:grid-cols-3">
                        {STEPS.map((step, idx) => (
                            <div key={step.step} className="relative">
                                <Card className="h-full border-2 transition-all hover:border-primary/30">
                                    <CardHeader>
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                                                {step.step}
                                            </div>
                                            <step.icon className="size-10 text-muted-foreground/30" />
                                        </div>
                                        <CardTitle className="text-xl">{step.title}</CardTitle>
                                        <CardDescription className="text-base">
                                            {step.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                {idx < 2 && (
                                    <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 md:block">
                                        <ArrowRightIcon className="size-8 text-muted-foreground/30" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}