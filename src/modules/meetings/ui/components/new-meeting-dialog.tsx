"use client";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";

interface INewMeetingDialog {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


export function NewMeetingDialog({ open, onOpenChange }: INewMeetingDialog) {

    const router = useRouter();

    function handleSuccess(id: string) {
        router.push(`/meetings/${id}`);
        onOpenChange(false);
    }
    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange} title="New Meeting" description="Create a new meeting">
            <MeetingForm
                onCancel={() => onOpenChange(false)}
                onSuccess={handleSuccess}
            />
        </ResponsiveDialog>
    )
}