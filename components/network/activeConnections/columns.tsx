"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { IoIosNotifications } from "react-icons/io";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ActiveConns = {
  id: string;
  name: string;
  address: string;
  "caller-id": string;
  uptime: string;
  service: string;
};

export const columns: ColumnDef<ActiveConns>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-fuchsia-500">Username</div>,
  },
  {
    accessorKey: "address",
    header: () => <div className="text-fuchsia-500">Ip Address</div>,
    cell: ({ row }) => (
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link
                className=" cursor-pointer underline"
                href={`http://${row.getValue("address")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.getValue("address")}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remote Access</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
  {
    accessorKey: "caller-id",
    header: () => <div className="text-fuchsia-500">MAC Address</div>,
  },
  {
    accessorKey: "uptime",
    header: () => <div className="text-fuchsia-500">Uptime</div>,
  },
  {
    accessorKey: "service",
    header: () => <div className="text-fuchsia-500">Service</div>,
  },
];
