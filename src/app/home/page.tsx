import { Button } from "@/components/ui/button";
import React from "react";
import ApplyLeaveDrawer from "./applydrawer";

export default function Page() {
  return (
    <div className="min-h-screen flex-1 py-5">
      <div className="flex w-full justify-center">
        <ApplyLeaveDrawer></ApplyLeaveDrawer>
      </div>
    </div>
  );
}
