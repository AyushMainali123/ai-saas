import { CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, LoaderIcon, TimerIcon } from "lucide-react";
import { TMeetingStatus } from "../../types";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { CommandSelect } from "@/components/ui/command-select";
import { cn } from "@/lib/utils";

const StatusIconMap = {
    upcoming: ClockArrowUpIcon,
    active: LoaderIcon,
    completed: CircleCheckIcon,
    processing: LoaderIcon,
    cancelled: CircleXIcon
}

const StatusColorMap: Record<TMeetingStatus, string> = {
    [TMeetingStatus.Upcoming]: "text-blue-500",
    [TMeetingStatus.Active]: "text-green-500",
    [TMeetingStatus.Completed]: "text-primary border-primary/20",
    [TMeetingStatus.Processing]: "text-yellow-500",
    [TMeetingStatus.Cancelled]: "text-red-500",
};

const options = [
    {
        label: "Upcoming",
        value: TMeetingStatus.Upcoming,
        children: (
            <div className="flex items-center capitalize gap-2.5">
                <StatusIconMap.upcoming className={cn("size-4 shrink-0", StatusColorMap[TMeetingStatus.Upcoming])} />
                <span className="font-normal">{TMeetingStatus.Upcoming}</span>
            </div>
        )
    },
    {
        label: "Active",
        value: TMeetingStatus.Active,
        children: (
            <div className="flex items-center capitalize gap-2.5">
                <StatusIconMap.active className={cn("size-4 shrink-0", StatusColorMap[TMeetingStatus.Active])} />
                <span className="font-normal">{TMeetingStatus.Active}</span>
            </div>
        )
    },
    {
        label: "Completed",
        value: TMeetingStatus.Completed,
        children: (
            <div className="flex items-center capitalize gap-2.5">
                <StatusIconMap.completed className={cn("size-4 shrink-0", StatusColorMap[TMeetingStatus.Completed])} />
                <span className="font-normal">{TMeetingStatus.Completed}</span>
            </div>
        )
    },
    {
        label: "Processing",
        value: TMeetingStatus.Processing,
        children: (
            <div className="flex items-center capitalize gap-2.5">
                <StatusIconMap.processing className={cn("size-4 shrink-0", StatusColorMap[TMeetingStatus.Processing])} />
                <span className="font-normal">{TMeetingStatus.Processing}</span>
            </div>
        )
    },
    {
        label: "Cancelled",
        value: TMeetingStatus.Cancelled,
        children: (
            <div className="flex items-center capitalize gap-2.5">
                <StatusIconMap.cancelled className={cn("size-4 shrink-0", StatusColorMap[TMeetingStatus.Cancelled])} />
                <span className="font-normal">{TMeetingStatus.Cancelled}</span>
            </div>
        )
    }
];


export const StatusFilter = () => {
    const [filters, setFilters] = useMeetingsFilter();
    const selectedFilter = options.find((option) => option.value === filters.status) ?? null;

    return (
        <CommandSelect
            options={options}
            value={selectedFilter?.value ?? ""}
            onSelect={(value) => setFilters({ ...filters, status: value as TMeetingStatus })}
            isSearchable={false}
            isLoading={false}
            placeholder="Filter by status"
            className="w-full sm:w-auto sm:min-w-[160px]"
        />
    )
}