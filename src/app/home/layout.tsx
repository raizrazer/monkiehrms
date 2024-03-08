import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative  flex min-h-screen flex-col">
      <div className="sticky top-0 flex w-full bg-primary py-4 text-center ">
        <div className="container flex justify-between  text-white">
          <div className="text-2xl font-bold">Monkie HRMS</div>
          <div className="flex items-center gap-4">
            <div>
              Hi, <span className="font-semibold">Mohammed Raiz</span>
            </div>

            <Button variant={"secondary"}>Logout</Button>
          </div>
        </div>
      </div>
      <div className="container">{children}</div>
    </div>
  );
}
