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
import { BanIcon } from "lucide-react";
import Link from "next/link";

export function CancelledState() {
    return (
        <div className="flex items-center justify-center py-10">
            <Card className="w-full max-w-sm shadow-md border-destructive/50 bg-destructive/5">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                        <BanIcon className="size-6 text-destructive" />
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-xl text-destructive">Meeting Cancelled</CardTitle>
                        <CardDescription>
                            This meeting was cancelled
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                    <p>
                        No further actions can be taken for this meeting.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/dashboard/meetings">
                            Back to Meetings
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}