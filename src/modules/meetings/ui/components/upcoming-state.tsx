"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BanIcon, CalendarIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface IUpcomingStateProps {
    meetingId: string;
    onCancelMeeting: () => void;
    isCancelling: boolean;
}

export function UpcomingState({ meetingId, onCancelMeeting, isCancelling }: IUpcomingStateProps) {
    return (
        <div className="flex items-center justify-center py-10">
            <Card className="w-full max-w-sm shadow-md">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <CalendarIcon className="size-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-xl">Meeting Upcoming</CardTitle>
                        <CardDescription>
                            This meeting has not started yet
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                    <p>
                        Once you start the meeting, existing summaries and transcripts will appear here automatically.
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full gap-2" disabled={isCancelling} asChild>
                        <Link href={`/call/${meetingId}`}>
                            <VideoIcon className="size-4" />
                            Start Meeting
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onCancelMeeting}
                        disabled={isCancelling}
                        className="w-full gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                        <BanIcon className="size-4" />
                        Cancel Meeting
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}