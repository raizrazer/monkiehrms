import React, { ReactNode } from "react";
import RootLayout from "../layout";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout>
      <div className="relative flex min-h-screen flex-col">
        <div className="sticky top-0 flex w-full justify-center bg-primary py-4 text-center text-2xl font-bold text-white">
          Monkie HRMS
        </div>
        {children}
      </div>
    </RootLayout>
  );
}
