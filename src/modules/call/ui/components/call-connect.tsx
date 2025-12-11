"use client";

import { useTRPC } from '@/trpc/client';
import {
    Call,
    CallingState,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
} from '@stream-io/video-react-sdk'
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { CallUI } from './call-ui';


interface Props {
    meetingId: string;
    meetingName: string;
    userId: string;
    userName: string;
    userImage: string;
}


const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
if (!apiKey) {
    throw new Error("NEXT_PUBLIC_STREAM_VIDEO_API_KEY is not defined");
}

export const CallConnect = ({ meetingId, meetingName, userId, userName, userImage }: Props) => {
    const trpc = useTRPC();
    const { mutateAsync: generateToken } = useMutation(trpc.meetings.generateToken.mutationOptions({}));
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);

    useEffect(() => {
        const _client = new StreamVideoClient({
            apiKey: apiKey,
            user: {
                id: userId,
                name: userName,
                image: userImage,
            },
            tokenProvider: generateToken,
        });
        setClient(_client);

        return () => {
            _client.disconnectUser();
            setClient(null);
        };
    }, [userId, userName, userImage, generateToken]);


    useEffect(() => {
        if (!client) return;
        const _call = client.call("default", meetingId);
        _call.camera.disable();
        _call.microphone.disable();
        setCall(_call);

        return () => {
            if (_call.state.callingState !== CallingState.LEFT) {
                _call.leave();
                _call.endCall();
            }
            setCall(null);
        };
    }, [client, meetingId]);

    if (!client || !call) {
        return (
            <Loader2Icon className="animate-spin" />
        )
    }

    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <CallUI meetingName={meetingName} />
            </StreamCall>
        </StreamVideo>
    )
}