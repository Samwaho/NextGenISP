import React from "react";
import { ModeToggle } from "../global/ModeToggle";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full p-3">
      <h4 className="font-semibold text-lg">Settlenet Ltd</h4>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
