"use client";

import { CallActive as CallActiveBase, ICallActive } from "./call-active-base";
import { useEffect } from "react";

export const CallActive = (props: ICallActive) => {

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/stream-video.css";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return <CallActiveBase {...props} />;
}