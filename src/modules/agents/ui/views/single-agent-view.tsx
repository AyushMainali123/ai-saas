"use client";

import { ErrorState, IErrorStateProps } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "../components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/ui/generated-avatar";
import { ClipboardList, VideoIcon } from "lucide-react";

interface ISingleAgentViewProps {
    agentId: string;
}

export default function SingleAgentView({ agentId }: ISingleAgentViewProps) {
    const trpc = useTRPC();
    const { data: agent } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));
    return (
        <div className="space-y-6 px-6 py-4">
            <AgentIdViewHeader
                agentId={agent.id}
                agentName={agent.name}
                onEdit={() => { }}
                onDelete={() => { }}
            />

            <div className="max-w-sm mx-auto space-y-6">
                {/* Agent Info Card - Floating/Glass Effect */}
                <div className="rounded-2xl border border-border/70 bg-background/50 backdrop-blur-md p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-4">
                        {/* Avatar Section */}
                        <div className="relative shrink-0">
                            {/* Added a subtle gradient to the avatar ring for depth */}
                            <GeneratedAvatar collection="botttsNeutral" seed={agent.name} className="h-16 w-16 ring-4 ring-primary/20 ring-offset-4 ring-offset-background/50 rounded-full bg-linear-to-br from-primary/10 to-secondary/10" />
                        </div>

                        <div className="space-y-1.5 min-w-0">
                            {/* Agent Name */}
                            <h1 className="text-2xl font-extrabold tracking-tight truncate text-foreground/90">{agent.name}</h1>

                            {/* Meeting Count */}
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <VideoIcon className="h-4 w-4 text-primary" />
                                <span className="text-xs uppercase tracking-wider">{agent.meetingCount} {agent.meetingCount === 1 ? 'MEETING' : 'MEETINGS'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Stronger Divider --- */}

                {/* Instructions Section - Elevated & Boxed */}
                <div className="space-y-3">
                    <h2 className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-muted-foreground">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        Instructions
                    </h2>

                    {/* Instruction Content Block */}
                    <div className="rounded-xl bg-card border border-border p-4 shadow-sm">
                        <p className="text-sm leading-relaxed text-foreground/80">{agent.instructions}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}



export const SingleAgentViewLoadingState = () => {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <LoadingState title="Loading Agent" description="Please wait while we load your agent" />
        </div>
    )
}


export const SingleAgentViewErrorState = (props: IErrorStateProps) => {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <ErrorState {...props} />
        </div>
    )
}
