"use client";

import {
    CallControls,
    CallingState,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { LayoutList, LayoutGrid, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ICallActive {
    onLeave: () => void;
    meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: ICallActive) => {
    const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();


    if (callingState === CallingState.JOINING) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-zinc-950 text-white">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="mt-2 text-sm text-zinc-400">Joining call...</p>
            </div>
        );
    }



    if (callingState === CallingState.LEFT) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-zinc-950 text-white">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="mt-2 text-sm text-zinc-400">Leaving the call...</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-zinc-950 text-white overflow-hidden relative">
            <div className="h-14 flex items-center justify-between px-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-sm z-10 shrink-0">
                <div className="flex items-center gap-2">
                    <h1 className="text-sm font-medium text-zinc-100">{meetingName}</h1>
                    <div className="w-px h-4 bg-white/10 mx-2" />
                </div>

                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-zinc-400 hover:text-white"
                                    onClick={() => setLayout(layout === "grid" ? "speaker" : "grid")}
                                >
                                    {layout === "grid" ? <LayoutList className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Switch to {layout === "grid" ? "Speaker" : "Grid"} view</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <div className="flex-1 w-full relative overflow-hidden flex justify-center items-center">
                {layout === "grid" ? (
                    <PaginatedGridLayout
                        groupSize={16}
                    />
                ) : (
                    <SpeakerLayout
                        participantsBarPosition="bottom"
                    />
                )}
            </div>

            <div className="h-20 flex items-center justify-center bg-zinc-900/90">
                <CallControls onLeave={onLeave} />
            </div>
        </div>
    )
}
