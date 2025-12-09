'use client';

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";

export function MeetingsListHeader() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <NewMeetingDialog open={open} onOpenChange={setOpen} />
            <div className="py-4 px-6 gap-y-4">
                <div className="flex items-center justify-between  mb-4">
                    <h5 className="font-medium text-xl">My Meetings</h5>
                    <Button onClick={() => setOpen(true)}>
                        <PlusIcon aria-hidden="true" />
                        New Meeting
                    </Button>
                </div>
                <div>
                    TODO:  FILTERS
                </div>
            </div>
        </>
    )
}