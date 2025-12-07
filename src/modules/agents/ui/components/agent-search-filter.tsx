"use client";

import { Input } from "@/components/ui/input";
import { useAgentsFilter } from "../../hooks/use-agents-filter";
import { SearchIcon } from "lucide-react";
import { INITIAL_PAGE } from "@/app/constants";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

const DEBOUNCE_DELAY = 500;

export function AgentSearchFilter() {
    const [filters, setFilters] = useAgentsFilter();
    const [searchVal, setSeachVal] = useState(filters.search);
    const debouncedSearch = useDebounce({ value: searchVal, delay: DEBOUNCE_DELAY });

    useEffect(() => {
        setFilters({ page: INITIAL_PAGE, search: debouncedSearch });
    }, [debouncedSearch, setFilters]);

    return (
        <div className="relative max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Filter by name..."
                value={searchVal}
                onChange={(e) => setSeachVal(e.target.value)}
                className="pl-9"
            />
        </div>
    )
}