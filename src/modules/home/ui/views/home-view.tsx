"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function HomeView() {
    const trpc = useTRPC();
    const { data } = useQuery(trpc.hello.queryOptions({ text: "Ayush" }));

    return (
        <div>
            <p>{data?.greeting}</p>
        </div>
    )
}