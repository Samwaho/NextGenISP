"use client";
import { ArrowLeftFromLine } from "lucide-react";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { sidebarData } from "@/lib/constants";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="h-[95dvh] bg-card_light dark:bg-card_dark w-[300px] shadow-md rounded-3xl fixed top-4 left-6 p-6">
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-bold tracking-wide">NextGen</h4>
        <ArrowLeftFromLine strokeWidth={2.5} />
      </div>
      <div className="-ms-2 mt-4">
        <Command className="bg-transparent">
          <CommandInput placeholder="Search menu item..." />
          <CommandList className="mt-2">
            <CommandEmpty>No results found.</CommandEmpty>
            {sidebarData.map((item) => (
              <CommandItem key={item.title} className="flex items-center gap-3">
                <i
                  className={` p-1 rounded-md shadow-md text-white ${
                    pathname === item.path
                      ? "bg-gradient-custom"
                      : "bg-gradient-custom2"
                  }`}
                >
                  <item.icon className="text-lg font-bold" />
                </i>
                <p className="text-md">{item.title}</p>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

export default Sidebar;
