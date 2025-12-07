"use client";

import { LoadingState } from "@/components/ui/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { agentColumns } from "../components/columns";
import { useAgentsFilter } from "../../hooks/use-agents-filter";
import { DataPagination } from "../components/data-pagination";

export default function AgentsView() {
    const trpc = useTRPC();
    const [filter, setFilter] = useAgentsFilter();

    const { data: agents } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filter
    }));

    return (
        <div className="px-6 py-4">
            <DataTable columns={agentColumns} data={agents.items} />
            <div className="mt-4">
                <DataPagination
                    page={filter.page}
                    totalPages={agents.totalPages}
                    onPageChange={(page) => setFilter({ ...filter, page })}
                />
            </div>
        </div>
    );
}


export const AgentsViewLoadingState = () => {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <LoadingState title="Loading Agents" description="Please wait while we load your agents" />
        </div>
    )
}
