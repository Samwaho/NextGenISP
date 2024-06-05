import MikrotikForm from "@/components/forms/mikrotik/MikrotikForm";
import { getLoggedInUser } from "@/lib/actions/actions";
import React from "react";

const page = async () => {
  return (
    <div>
      <MikrotikForm />
    </div>
  );
};

export default page;
