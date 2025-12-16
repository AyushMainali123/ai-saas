import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuitIcon, CalendarIcon, LineChartIcon, MessageSquareIcon, SparklesIcon, VideoIcon } from "lucide-react";


const FEATURES = [
    {
        icon: BrainCircuitIcon,
        title: "Custom AI Agents",
        description: "Create and customize AI agents with specific instructions and personalities tailored to your needs.",
        color: "from-chart-1 to-chart-5"
    },
    {
        icon: VideoIcon,
        title: "Real-Time Video",
        description: "HD video conferencing powered by Stream Video with crystal-clear quality and low latency.",
        color: "from-chart-2 to-chart-3"
    },
    {
        icon: MessageSquareIcon,
        title: "Live Transcription",
        description: "Automated real-time speech-to-text transcription with full-text search capabilities.",
        color: "from-chart-3 to-chart-4"
    },
    {
        icon: SparklesIcon,
        title: "AI Summaries",
        description: "Automatically generate comprehensive meeting summaries and action items with AI.",
        color: "from-chart-4 to-chart-1"
    },
    {
        icon: CalendarIcon,
        title: "Meeting Management",
        description: "Schedule, organize, and manage all your meetings in one centralized dashboard.",
        color: "from-chart-5 to-chart-2"
    },
    {
        icon: LineChartIcon,
        title: "Analytics & Insights",
        description: "Track meetings, agents, and AI-generated insights to improve productivity.",
        color: "from-chart-1 to-chart-3"
    },
]


export function LandingFeatures() {
    return (
        <section id="features" className="py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary" variant="outline">
                        Features
                    </Badge>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                        Everything You Need for Intelligent Meetings
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Powerful AI capabilities designed to enhance every aspect of your video meetings
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.map((feature) => (
                        <Card
                            key={feature.title}
                            className="group transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                        >
                            <CardHeader>
                                <div className={`mb-3 flex size-12 items-center justify-center rounded-lg bg-linear-to-br ${feature.color} shadow-md`}>
                                    <feature.icon className="size-6 text-white" />
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                                <CardDescription className="text-base">
                                    {feature.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}