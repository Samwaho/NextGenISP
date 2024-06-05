"use client";
import { ArrowLeftFromLine } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { sidebarData } from "@/lib/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getLoggedInUser } from "@/lib/actions/actions";
import Feeds from "../feeds/page";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

type User = {
  name: string;
  // Add other properties if needed
};
const Sidebar = () => {
  const [loggedInUser, setloggedInUser] = useState<User | null>(null);
  const [isDock, setisDock] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const user = await getLoggedInUser();
      setloggedInUser(user);
    };
    getUser();
  }, []);

  const pathname = usePathname();
  return (
    <div
      className={`h-[95dvh] bg-card_light dark:bg-card_dark ${
        isDock ? "w-[70px] p-4" : "w-[300px] p-6"
      }  shadow-md rounded-3xl fixed top-4 left-6 transition-all duration-300`}
    >
      <div className="flex justify-between items-center">
        <h4
          className={`text-2xl font-bold tracking-wide ${isDock && "hidden"}`}
        >
          NextGen
        </h4>
        <ArrowLeftFromLine
          onClick={() => setisDock(!isDock)}
          strokeWidth={2.5}
          className="cursor-pointer"
        />
      </div>
      <div className="-ms-2 mt-4">
        <Command className="bg-transparent">
          {!isDock && (
            <CommandInput
              className={`${isDock && "hidden"}`}
              placeholder="Search menu item..."
            />
          )}

          <CommandList className="mt-2">
            <CommandEmpty>No results found.</CommandEmpty>
            {sidebarData.map((item) => (
              <CommandItem key={item.title}>
                <Link
                  className={`flex items-center gap-3 ${isDock && ""}`}
                  href={item.path}
                >
                  <i
                    className={` p-1 rounded-md shadow-md text-white ${
                      pathname === item.path
                        ? "bg-gradient-custom"
                        : "bg-gradient-custom2"
                    }`}
                  >
                    <item.icon
                      className={`text-lg font-bold ${isDock && ""}`}
                    />
                  </i>
                  <p className={`text-md ${isDock && "hidden"}`}>
                    {item.title}
                  </p>
                </Link>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </div>
      {loggedInUser && (
        <div className="flex flex-col gap-2 absolute bottom-4 w-[85%]">
          <div className="flex items-center justify-between  ">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-gradient-custom">
                <p className="text-white">{loggedInUser.name[0]}</p>
              </div>
              <p className={`text-md ${isDock && "hidden"}`}>
                {loggedInUser.name}
              </p>
            </div>
            <IoSettingsOutline className={`${isDock && "hidden"}`} size={22} />
          </div>
          {/* <div className="flex items-center gap-2 ms-2">
            <CiLogout />
            <p>Logout</p>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
