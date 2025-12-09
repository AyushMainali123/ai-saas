"use client";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";
import { TMeetingGetOne } from "../../types";

interface IUpdateMeetingDialog {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: TMeetingGetOne;
}


export function UpdateMeetingDialog({ open, onOpenChange, initialValues }: IUpdateMeetingDialog) {

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
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    )
}