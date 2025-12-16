import AgentsView, { AgentsViewErrorState, AgentsViewLoadingState } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { loadSearchParams } from "@/modules/agents/params";
import { SearchParams } from "nuqs/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Force dynamic rendering to prevent build-time fetch errors
export const dynamic = 'force-dynamic';

interface IAgentsPage {
    searchParams: Promise<SearchParams>;
}

export default async function AgentsPage({ searchParams }: IAgentsPage) {

    const params = await loadSearchParams(searchParams);
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
        ...params
    }));

    return (
        <>
            <AgentsListHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<AgentsViewLoadingState />}>
                    <ErrorBoundary FallbackComponent={AgentsViewErrorState}>
                        <AgentsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary >
        </>
    )
}