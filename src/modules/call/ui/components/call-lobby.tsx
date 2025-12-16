import { useRef, useState, useEffect } from "react";
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    ArrowLeft,
    Loader2,
    MonitorUp,
    Settings,
    UserCircle,
    InfoIcon
} from "lucide-react";
import {
    useCallStateHooks,
    VideoPreview,
    createSoundDetector
} from "@stream-io/video-react-sdk";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";


interface ICallLobby {
    onJoin: () => void;
}

const AudioVolumeIndicator = () => {
    const { useMicrophoneState } = useCallStateHooks();
    const { isEnabled: isMicrophoneEnabled, mediaStream } = useMicrophoneState();
    const [audioLevel, setAudioLevel] = useState(0);

    useEffect(() => {
        if (!isMicrophoneEnabled || !mediaStream) return;

        const disposeSoundDetector = createSoundDetector(
            mediaStream,
            ({ audioLevel: level }) => setAudioLevel(level),
            { detectionFrequencyInMs: 80, destroyStreamOnStop: false }
        );

        return () => {
            disposeSoundDetector();
        };
    }, [isMicrophoneEnabled, mediaStream]);

    if (!isMicrophoneEnabled) return null;

    const AUDIO_LEVEL_SCALE = 0.1;

    return (
        <div className="flex h-4 w-4 items-center justify-center shrink-0">
            <div
                className="w-2 h-2 rounded-full bg-primary transition-all duration-75 ease-in-out"
                style={{
                    transform: `scale(${Math.max(1, audioLevel * AUDIO_LEVEL_SCALE)})`
                }}
            />
        </div>
    );
};


export const CallLobby = ({ onJoin }: ICallLobby) => {
    const { useCameraState, useMicrophoneState } = useCallStateHooks();

    const { camera, isEnabled: isCameraEnabled, hasBrowserPermission: hasCameraPermission } = useCameraState();
    const { microphone, isEnabled: isMicrophoneEnabled, hasBrowserPermission: hasMicrophonePermission } = useMicrophoneState();

    const { data: auth } = authClient.useSession();
    const [isJoining, setIsJoining] = useState(false);

    const hasBrowserMediaPermission = hasCameraPermission && hasMicrophonePermission;

    const toggleCamera = async () => {
        try {
            await camera.toggle();
        } catch (e) {
            console.error("Failed to toggle camera", e);
        }
    }

    const toggleMicrophone = async () => {
        try {
            await microphone.toggle();
        } catch (e) {
            console.error("Failed to toggle microphone", e);
        }
    }

    const handleJoin = async () => {
        setIsJoining(true);
        try {
            onJoin();
        } catch (error) {
            console.error("Failed to join", error);
        } finally {
            setIsJoining(false);
        }
    }


    return (
        <main className="min-h-screen bg-black flex items-center justify-center p-4">
            <Card className="w-full max-w-lg border-zinc-800 bg-zinc-950/80 backdrop-blur-sm text-zinc-100 shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-medium">Join Meeting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="relative aspect-video rounded-xl bg-zinc-900 overflow-hidden ring-1 ring-white/10 shadow-inner group">
                        <VideoPreview
                            className="h-full w-full object-cover"
                            DisabledVideoPreview={() => (
                                <div className="h-full w-full flex flex-col items-center justify-center gap-4 bg-zinc-900">
                                    <div className="relative">
                                        <UserCircle className="w-16 h-16 text-zinc-700 animate-pulse" strokeWidth={1} />
                                        <div className="absolute -bottom-1 -right-1 bg-zinc-950 rounded-full p-1 ring-2 ring-zinc-900">
                                            <VideoOff className="w-4 h-4 text-zinc-500" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-zinc-500 font-medium">Camera is off</p>
                                </div>
                            )}
                        />

                        {/* Controls Overlay */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="bg-black/60 backdrop-blur rounded-full p-1.5 flex gap-2 pointer-events-auto border border-white/10">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={cn(`h-10 w-10 rounded-full transition-colors`,
                                                    isMicrophoneEnabled
                                                        ? 'bg-transparent text-white hover:bg-white/20'
                                                        : 'bg-red-500/90 text-white hover:bg-red-600/90'
                                                )}
                                                onClick={toggleMicrophone}
                                            >
                                                {isMicrophoneEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{isMicrophoneEnabled ? "Turn off microphone" : "Turn on microphone"}</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={`h-10 w-10 rounded-full transition-colors ${isCameraEnabled
                                                    ? 'bg-transparent text-white hover:bg-white/20'
                                                    : 'bg-red-500/90 text-white hover:bg-red-600/90'
                                                    }`}
                                                onClick={toggleCamera}
                                            >
                                                {isCameraEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{isCameraEnabled ? "Turn off camera" : "Turn on camera"}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>

                        {!hasBrowserMediaPermission && (
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-6 text-center z-50 backdrop-blur-sm">
                                <div className="space-y-2">
                                    <div className="mx-auto w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                                        <Settings className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <h4 className="font-semibold text-sm text-yellow-500">Permissions Check</h4>
                                    <p className="text-xs text-zinc-400 max-w-[200px] mx-auto">
                                        Please allow camera and microphone access to join the call.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="absolute top-3 right-3">
                            <AudioVolumeIndicator />
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-lg border border-white/5">
                        <Avatar className="h-10 w-10 border border-white/10">
                            <AvatarImage
                                src={auth?.user?.image ?? generateAvatarUri({ seed: auth?.user?.name ?? "", collection: "initials" })}
                                alt={auth?.user?.name}
                            />
                            <AvatarFallback className="bg-zinc-800 text-zinc-300">
                                {auth?.user?.name?.slice(0, 2)?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-100 truncate">
                                {auth?.user?.name ?? "Guest"}
                            </p>
                            <p className="text-xs text-zinc-500">
                                Joining as
                            </p>
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button
                        className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-base font-medium shadow-lg shadow-primary/20"
                        onClick={handleJoin}
                        disabled={isJoining || !hasBrowserMediaPermission}
                    >
                        {isJoining ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Joining...
                            </>
                        ) : (
                            "Join Meeting"
                        )}
                    </Button>

                    <div className="flex items-center justify-between w-full">
                        <Button asChild variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100 hover:bg-white/5">
                            <Link href="/dashboard/meetings" className="flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Link>
                        </Button>
                        <Button asChild variant="link" size="sm" className="text-zinc-500 hover:text-zinc-300 text-xs">
                            <a href="mailto:support@example.com" className="flex items-center gap-1.5">
                                <InfoIcon className="w-3.5 h-3.5" />
                                Need help?
                            </a>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    )
}
