"use client";

import { Input } from "@/components/ui/input";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { SearchIcon } from "lucide-react";
import { INITIAL_PAGE } from "@/app/constants";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

const DEBOUNCE_DELAY = 500;

export function MeetingSearchFilter() {
    const [filters, setFilters] = useMeetingsFilter();
    const [searchVal, setSearchVal] = useState(filters.search);
    const debouncedSearch = useDebounce({ value: searchVal, delay: DEBOUNCE_DELAY });

    useEffect(() => {
        setFilters({ page: INITIAL_PAGE, search: debouncedSearch });
    }, [debouncedSearch, setFilters]);

    return (
        <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors peer-focus:text-primary pointer-events-none z-10" />
            <Input
                placeholder="Search meetings..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="pl-10 w-full transition-all focus:shadow-md peer"
            />
        </div>
    )
}