import { auth } from "@/lib/auth";
import CallView from "@/modules/call/ui/views/call-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface ICallPage {
    params: Promise<{ meetingid: string }>;
}

export default async function CallPage({ params }: ICallPage) {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) return redirect('/auth/signin');


    const { meetingid } = await params;

    const queryClient = getQueryClient();
    queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({ id: meetingid }));
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CallView meetingid={meetingid} />
        </HydrationBoundary>
    );
}