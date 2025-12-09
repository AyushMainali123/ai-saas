import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import MeetingsView, { MeetingsViewErrorState, MeetingsViewLoadingState } from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function MeetingsPage() {

    const queryclient = getQueryClient();
    queryclient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

    return (
        <>
            <MeetingsListHeader />
            <HydrationBoundary state={dehydrate(queryclient)}>
                <Suspense fallback={<MeetingsViewLoadingState />}>
                    <ErrorBoundary FallbackComponent={MeetingsViewErrorState}>
                        <MeetingsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}