import Header from "@/components/header/page";
import Sidebar from "@/components/sidebar/Sidebar";
import { getLoggedInUser } from "@/lib/actions/actions";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full min-h-screen relative flex gap-4 ">
      <Sidebar />
      <div className="flex flex-col gap-4 ms-[350px] w-full">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layout;
