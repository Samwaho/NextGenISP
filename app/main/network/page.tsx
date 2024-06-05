import MikrotikForm from "@/components/forms/mikrotik/MikrotikForm";
import { getMikrotiks } from "@/lib/actions/actions";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const mikrotiks = await getMikrotiks();

  if (mikrotiks.total === 0) {
    return redirect("/main/network/add");
  }
  return <div>Mikrotik</div>;
};

export default page;
