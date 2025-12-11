"use client";

import { Loader2Icon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { CallConnect } from "./call-connect";


interface Props {
    meetingId: string;
    meetingName: string;
}

export const CallProvider = ({ meetingId, meetingName }: Props) => {
    const { data, isPending } = authClient.useSession();

    if (isPending) {
        return <Loader2Icon className="animate-spin" />
    }

    if (!data || !data.user) {
        return <Loader2Icon className="animate-spin" />
    }

    return (
        <CallConnect
            meetingId={meetingId}
            meetingName={meetingName}
            userId={data.user.id}
            userName={data.user.name}
            userImage={generateAvatarUri({ seed: data.user.name, collection: "initials" })}
        />
    )
}

