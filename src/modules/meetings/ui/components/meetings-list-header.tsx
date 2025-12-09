'use client';

import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { MeetingSearchFilter } from "./meeting-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";

export function MeetingsListHeader() {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useMeetingsFilter();

    const isMeetingFiltersModified = filters.agentId || filters.status || filters.search;

    function clearFilters() {
        setFilters({ agentId: null, page: null, search: null, status: null });
    }

    return (
        <>
            <NewMeetingDialog open={open} onOpenChange={setOpen} />
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h5 className="font-semibold text-2xl sm:text-3xl bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        My Meetings
                    </h5>
                    <Button
                        onClick={() => setOpen(true)}
                        size="default"
                        className="w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow"
                    >
                        <PlusIcon aria-hidden="true" className="size-4" />
                        New Meeting
                    </Button>
                </div>

                {/* Filters Section */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
                    <div className="flex-1 w-full sm:w-auto">
                        <MeetingSearchFilter />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <StatusFilter />
                        <AgentIdFilter />

                        {isMeetingFiltersModified && (
                            <Button
                                variant="outline"
                                onClick={clearFilters}
                                className="transition-all hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                            >
                                <XIcon aria-hidden="true" className="size-4" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}