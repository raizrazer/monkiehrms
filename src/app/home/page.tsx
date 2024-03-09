"use client";

import React, { useContext } from "react";

import ApproveLeaves from "./approveleaves";
import CreateEmployeeLogin from "./createemployeelogin";
import { UserContext } from "@/components/Contexts/UserContext";
import LeavesApplied from "./leavesapplied";
import ApplyLeaveDrawer from "./applydrawer";

export default function Page() {
  const { isHr, isManager } = useContext(UserContext);
  return (
    <div className="min-h-screen flex-1 py-5">
      <div className="flex w-full justify-center">
        {!isHr && <ApplyLeaveDrawer />}
        {isHr && <CreateEmployeeLogin />}
      </div>
      {(isHr || isManager) && (
        <div>
          <LeavesApplied />
        </div>
      )}
      <div>
        <ApproveLeaves />
      </div>
    </div>
  );
}
