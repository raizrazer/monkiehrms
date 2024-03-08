"use client";
import { Button } from "@/components/ui/button";
import signout from "@/firebase/signout";
import React, { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config/firebaseConfig";
import { useRouter } from "next/navigation";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  const router = useRouter();
  if (!user) {
    return router.push("/sign-in");
  }
  return (
    <div className="relative  flex min-h-screen flex-col">
      <div className="sticky top-0 flex w-full bg-primary py-4 text-center ">
        <div className="container flex justify-between  text-white">
          <div className="text-2xl font-bold">Monkie HRMS</div>
          <div className="flex items-center gap-4">
            <div>
              Hi, <span className="font-semibold">{user.email}</span>
            </div>

            <Button onClick={() => signout()} variant={"secondary"}>
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="container">{children}</div>
    </div>
  );
}
