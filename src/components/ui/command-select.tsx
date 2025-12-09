import { useState, ReactNode } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, ResponsiveCommandDialog } from './command';
import { Button } from './button';
import { ChevronsUpDownIcon, Loader2Icon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { wait } from '@/lib/wait';


interface IProps {
    options: Array<{ label: string; value: string; children: ReactNode }>;
    onSelect: (value: string) => void;
    onSearch?: (value: string) => void;
    value: string;
    placeholder?: string;
    isLoading?: boolean;
    isSearchable?: boolean;
    className?: string;
}

const WAIT_MS = 200;

export function CommandSelect({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = "Select an option",
    isLoading,
    isSearchable,
    className
}: IProps) {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find((option) => option.value === value);

    function handleOpenChange(open: boolean) {
        setOpen(open);
        wait(WAIT_MS).then(() => onSearch?.(""));
    }

    return (
        <>
            <Button variant="outline" type="button" className={cn(
                "h-9 justify-between font-normal px-2",
                !selectedOption && "text-muted-foreground",
                className
            )}
                onClick={() => setOpen(true)}
            >
                {selectedOption?.children ?? placeholder}
                <ChevronsUpDownIcon />
            </Button>

            <ResponsiveCommandDialog shouldFilter={!onSearch} open={open} onOpenChange={handleOpenChange}>
                {isSearchable && <CommandInput placeholder={placeholder} onValueChange={onSearch} />}
                {isLoading && (
                    <div className="flex items-center justify-center py-4">
                        <Loader2Icon className="animate-spin text-primary" />
                        <span aria-hidden="true" className='sr-only'>Loading...</span>
                    </div>)}

                {!isLoading && <CommandList>
                    <CommandEmpty>
                        <p className="py-6 text-center text-sm text-muted-foreground">
                            No results found.
                        </p>
                    </CommandEmpty>
                    <CommandGroup>
                        {options.map((option) => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => {
                                    onSelect(option.value);
                                    setOpen(false);
                                }}>
                                {option.children}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>}
            </ResponsiveCommandDialog>
        </>
    );
}
