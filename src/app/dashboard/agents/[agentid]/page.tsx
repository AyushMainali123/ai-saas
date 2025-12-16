import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import SingleAgentView, { SingleAgentViewErrorState, SingleAgentViewLoadingState } from "@/modules/agents/ui/views/single-agent-view";
import { Suspense } from "react";

interface IProps {
    params: Promise<{ agentid: string }>;
}

export default async function SingleAgentPage({ params }: IProps) {

    const { agentid } = await params;
    const queryclient = getQueryClient();
    await queryclient.prefetchQuery(trpc.agents.getOne.queryOptions({ id: agentid }));


    return (
        <HydrationBoundary state={dehydrate(queryclient)}>
            <Suspense fallback={<SingleAgentViewLoadingState />}>
                <ErrorBoundary FallbackComponent={SingleAgentViewErrorState}>
                    <SingleAgentView agentId={agentid} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}