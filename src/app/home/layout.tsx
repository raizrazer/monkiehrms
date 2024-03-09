"use client";
import { Button } from "@/components/ui/button";
import signout from "@/firebase/signout";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { UserContext } from "@/components/Contexts/UserContext";

import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config/firebaseConfig";
import { getFirestore, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { firebaseApp } from "@/firebase/config/firebaseConfig";
import { redirect } from "next/navigation";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const [user] = useIdToken(auth);

  if (!user) {
    redirect("/sign-in");
  }

  const [isHr, setIsHr] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [value, loading, error] = useDocument(
    doc(getFirestore(firebaseApp), "users", `${user?.uid}`)
  );
  useEffect(() => {
    if (value?.data()) {
      if (value?.data()?.isManager) {
        setIsManager(true);
      }
      if (value?.data()?.isHr) {
        setIsHr(true);
      }
    }
  }, [value]);

  return (
    <UserContext.Provider value={{ isHr, isManager, setIsHr, setIsManager }}>
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
    </UserContext.Provider>
  );
}
