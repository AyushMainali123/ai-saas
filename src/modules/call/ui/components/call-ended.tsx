import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, VideoOff } from "lucide-react";


export const CallEnded = () => {
    return (
        <main className="min-h-screen bg-black flex items-center justify-center p-4">
            <Card className="w-full max-w-sm border-zinc-800 bg-zinc-950/80 backdrop-blur-sm text-zinc-100 shadow-2xl">
                <CardHeader className="flex flex-col items-center gap-4 py-10">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center ring-1 ring-red-500/20">
                        <VideoOff className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="text-center space-y-2">
                        <CardTitle className="text-xl font-medium">Call Ended</CardTitle>
                        <p className="text-sm text-zinc-400">
                            You have left the meeting.
                        </p>
                    </div>
                </CardHeader>
                <CardFooter className="flex justify-center pb-8">
                    <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href="/dashboard/meetings" className="flex items-center gap-2 justify-center">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Meetings
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}
