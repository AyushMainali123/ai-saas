"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TAgentGetOne } from "../../types"
import { GeneratedAvatar } from "@/components/ui/generated-avatar"
import { VideoIcon, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const agentColumns: ColumnDef<TAgentGetOne>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <div className="space-y-2.5">
          {/* Header Section with Avatar and Name */}
          <div className="flex items-center gap-3">
            <GeneratedAvatar
              seed={row.original.name}
              collection="botttsNeutral"
              className="size-10 shrink-0"
            />

            <div className="flex flex-col min-w-0 flex-1">
              <h3 className="font-semibold text-sm truncate">
                {row.original.name}
              </h3>

              <div className="flex items-center gap-2 mt-0.5">
                <code className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded font-mono">
                  {row.original.id.slice(0, 8)}...
                </code>
                <div className="flex items-center gap-1 text-[10px] text-green-600 dark:text-green-400">
                  <Activity className="size-3" />
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="pl-0">
            <p className="text-xs text-muted-foreground line-clamp-2">
              {row.original.instructions}
            </p>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "meetingCount",
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <Badge
          variant="outline"
          className="gap-1.5 whitespace-nowrap"
        >
          <VideoIcon className="size-3.5" />
          <span className="text-sm font-medium">{row.original.meetingCount}</span>
          <span className="text-xs opacity-70">
            {row.original.meetingCount === 1 ? "meeting" : "meetings"}
          </span>
        </Badge>
      </div>
    )
  }
]