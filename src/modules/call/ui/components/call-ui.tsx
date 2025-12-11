import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallLobby } from "./call-lobby";
import { CallEnded } from "./call-ended";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const CallActive = dynamic(
    () => import("./call-active").then(mod => mod.CallActive),
    {
        loading: () => (
            <div className="h-full flex flex-col items-center justify-center bg-zinc-950 text-white">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="mt-2 text-sm text-zinc-400">Loading call...</p>
            </div>
        )
    }
);

interface ICallUIProps {
    meetingName: string;
}

export function CallUI({ meetingName }: ICallUIProps) {

    const call = useCall();
    const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

    const handleJoin = async () => {
        if (!call) return;
        await call.join();
        setShow("call");
    }

    const handleLeave = async () => {
        if (!call) return;
        await call.endCall();
        setShow("ended");
    }

    return (
        <StreamTheme className="h-full">
            {show === "lobby" && <CallLobby onJoin={handleJoin} />}
            {show === "call" && <CallActive onLeave={handleLeave} meetingName={meetingName} />}
            {show === "ended" && <CallEnded />}
        </StreamTheme>
    )
}