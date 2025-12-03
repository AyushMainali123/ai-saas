import {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    ResponsiveCommandDialog,
} from "@/components/ui/command"


interface IDashboardCommandProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function DashboardCommand({ open, setOpen }: IDashboardCommandProps) {
    return (
        <ResponsiveCommandDialog open={open} onOpenChange={setOpen} title="Find meetings or agents" description="Select meetings or agents from the command box below">
            <CommandInput placeholder="Find meetings or agents" />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem>Meetings</CommandItem>
                    <CommandItem>Agents</CommandItem>
                </CommandGroup>
            </CommandList>
        </ResponsiveCommandDialog>
    )
}