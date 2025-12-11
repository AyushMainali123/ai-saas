import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamClient } from "@/lib/stream-video";
import { TMeetingStatus } from "@/modules/meetings/types";
import { WebhookEvent } from "@stream-io/node-sdk";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type TCustomData = {
    meetingId?: string;
    meetingName?: string;
}

export const POST = async (req: Request) => {
    const signature = req.headers.get("x-signature");
    const apiKey = req.headers.get("x-api-key");
    const openAiApiKey = process.env.OPENAI_API_KEY;

    if (!signature || !apiKey) return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    if (!openAiApiKey) return NextResponse.json({ error: "Missing openAiApiKey" }, { status: 400 })

    const data = await req.text();
    const isValid = streamClient.verifyWebhook(data, signature);

    if (!isValid) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

    let webhookData: WebhookEvent | null;
    try {
        webhookData = JSON.parse(data) as WebhookEvent;
    } catch (error) {
        return NextResponse.json({ error: "Failed to parse webhook data" }, { status: 400 })
    }

    const eventType = webhookData.type;
    if (eventType === "call.session_started") {
        const customData = webhookData.call.custom as TCustomData;

        if (!customData.meetingId) {
            return NextResponse.json({ error: "Missing meetingId" }, { status: 400 })
        }

        const [existingMeeting] = await db.update(meetings)
            .set({ status: TMeetingStatus.Active })
            .where(and(
                eq(meetings.id, customData.meetingId),
                eq(meetings.status, TMeetingStatus.Upcoming)
            ))
            .returning();

        if (!existingMeeting) {
            const [activeMeeting] = await db.select().from(meetings).where(eq(meetings.id, customData.meetingId));

            if (activeMeeting?.status === TMeetingStatus.Active) {
                return NextResponse.json({ ok: true }, { status: 200 });
            }

            return NextResponse.json({ error: "Meeting not found or not upcoming" }, { status: 400 });
        }

        const [existingAgent] = await db.select().from(agents).where(eq(agents.id, existingMeeting.agentId));

        if (!existingAgent) {
            return NextResponse.json({ error: "Agent not found" }, { status: 400 })
        }

        const call = streamClient.video.call("default", customData.meetingId);
        const realtimeClient = await streamClient.video.connectOpenAi({
            call,
            openAiApiKey,
            agentUserId: existingAgent.id
        });

        realtimeClient.updateSession({
            instructions: `${existingAgent.instructions}. Say "Hello, I am ready" immediately when you join.`,
            voice: "alloy",
            modalities: ["text", "audio"],
            turn_detection: { type: "server_vad" },
        });
    } else if (eventType === "call.session_participant_left") {
        const meetingId = webhookData.call_cid.split(":")[1]; // meetingId is the second part of the call_cid

        if (!meetingId) {
            return NextResponse.json({ error: "Missing meetingId" }, { status: 400 })
        }

        const call = streamClient.video.call("default", meetingId);
        await call.end();
    }



    return NextResponse.json({ ok: true }, { status: 200 })
}