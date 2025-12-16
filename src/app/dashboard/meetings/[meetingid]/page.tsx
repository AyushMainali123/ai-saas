import MeetingIdView, { MeetingIDViewErrorState, MeetingIDViewLoadingState } from "@/modules/meetings/ui/views/single-meeting-view";
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface IMeetingPage {
    params: Promise<{ meetingid: string }>
}

export default async function MeetingPage({ params }: IMeetingPage) {
    const { meetingid } = await params;
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({ id: meetingid }));
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingIDViewLoadingState />}>
                <ErrorBoundary FallbackComponent={MeetingIDViewErrorState}>
                    <MeetingIdView meetingid={meetingid} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}