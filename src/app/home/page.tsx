import { Button } from "@/components/ui/button";
import React from "react";
import ApplyLeaveDrawer from "./applydrawer";
import LeavesApplied from "./leavesapplied";
import ApproveLeaves from "./approveleaves";
import CreateEmployeeLogin from "./createemployeelogin";

export default function Page() {
  return (
    <div className="min-h-screen flex-1 py-5">
      <div className="flex w-full justify-center">
        {/* <ApplyLeaveDrawer /> */}
        <CreateEmployeeLogin />
      </div>
      {/* <div>
        <LeavesApplied />
      </div> */}
      <div>
        <ApproveLeaves />
      </div>
    </div>
  );
}
