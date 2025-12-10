"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";

export function ProcessingState() {
    return (
        <div className="flex items-center justify-center py-10">
            <Card className="w-full max-w-sm shadow-md border-indigo-200/50 bg-indigo-50/20 dark:bg-indigo-900/10 dark:border-indigo-800/50">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                        <Loader2Icon className="size-6 text-indigo-500 animate-spin" />
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-xl text-indigo-600 dark:text-indigo-400">Processing Meeting</CardTitle>
                        <CardDescription>
                            We are analyzing your meeting
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                    <p>
                        This usually takes a few minutes. Summary, transcription, and action items will appear here soon.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}