import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { signOut, useSession } from "@/lib/auth-client";
import { CreditCard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";


export const DashboardUserButton = () => {

    const { data: session } = useSession();
    const router = useRouter();

    const handleLogout = () => {
        signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/signin");
                }
            }
        })
    }

    if (!session) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                        <AvatarFallback className="rounded-lg">
                            {session?.user?.name?.slice(0, 2)?.toUpperCase() || "CN"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{session?.user?.name}</span>
                    </div>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                            <AvatarFallback className="rounded-lg">
                                {session?.user?.name?.slice(0, 2)?.toUpperCase() || "CN"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{session?.user?.name}</span>
                            <span className="truncate text-xs">{session?.user?.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <CreditCard />
                    Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}