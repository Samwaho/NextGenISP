import React from "react";
import { ModeToggle } from "../global/ModeToggle";
import { IoIosNotifications } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full px-6 mt-4">
      <h4 className="font-semibold text-xl">
        <span className=" font-normal text-sm opacity-80">Welcome </span>{" "}
        Settlenet Ltd
      </h4>
      <div className="flex gap-2 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoIosNotifications size={25} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ModeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Switch mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Header;
