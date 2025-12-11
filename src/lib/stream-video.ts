import "server-only";

import { StreamClient } from "@stream-io/node-sdk";


if (!process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY || !process.env.STREAM_VIDEO_SECRET_KEY) {
    throw new Error("Please add Stream Video API Key and Secret Key to the environment variables");
}

export const streamClient = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
    process.env.STREAM_VIDEO_SECRET_KEY
);