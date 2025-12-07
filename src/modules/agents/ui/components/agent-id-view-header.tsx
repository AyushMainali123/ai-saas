"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface ISingleAgentViewProps {
    agentId: string;
    agentName: string;
    onEdit: () => void;
    onDelete: () => void;
}

export function AgentIdViewHeader({ agentId, agentName, onEdit, onDelete }: ISingleAgentViewProps) {
    return (
        <div className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList className="sm:gap-1.5">
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/agents" className="text-muted-foreground text-lg font-medium">Agents</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="[&>svg]:size-5" />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={`/agents/${agentId}`} className="text-foreground text-lg font-semibold">{agentName}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete} className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}