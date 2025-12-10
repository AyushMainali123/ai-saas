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
import { MousePointerClickIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface IActiveStateProps {
    meetingId: string;
}

export function ActiveState({ meetingId }: IActiveStateProps) {
    return (
        <div className="flex items-center justify-center py-10">
            <Card className="w-full max-w-sm shadow-md border-green-200/50 bg-green-50/20 dark:bg-green-900/10 dark:border-green-800/50">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center animate-pulse">
                        <MousePointerClickIcon className="size-6 text-green-500" />
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-xl text-green-600 dark:text-green-400">Meeting is active</CardTitle>
                        <CardDescription>
                            Join now to participate
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                    <p>
                        Meeting is currently in progress. It will end automatically once all participants leave.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white" asChild>
                        <Link href={`/call/${meetingId}`}>
                            <VideoIcon className="size-4" />
                            Join Meeting
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}