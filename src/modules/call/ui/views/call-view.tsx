"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallProvider } from "../components/call-provider";

interface ICallViewProps {
    meetingid: string;
}

export default function CallView({ meetingid }: ICallViewProps) {
    const trpc = useTRPC();
    const { data: meeting } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingid }));

    if (meeting.status === "completed") {
        return (
            <Card className="w-fit border">
                <CardContent className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-medium">Meeting is completed</h3>
                    <p className="mt-2 text-sm max-w-sm">The meeting you are trying to join has already completed. You can no longer join the meeting</p>

                </CardContent>
            </Card>
        )
    }

    return (
        <div className="h-screen w-full bg-black">
            <CallProvider meetingId={meetingid} meetingName={meeting.name} />
        </div>
    );
}