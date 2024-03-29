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
import { Badge } from "@/components/ui/badge";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const [user] = useIdToken(auth);

  if (!user) {
    redirect("/sign-in");
  }

  const [nameFilled, setNameFilled] = useState(true);
  const [isHr, setIsHr] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [value] = useDocument(
    doc(getFirestore(firebaseApp), "users", `${user?.uid}`)
  );
  const [mainLoading, setMainLoading] = useState(false);
  useEffect(() => {
    if (value?.data()) {
      if (value?.data()?.isManager) {
        setIsManager(true);
      }
      if (value?.data()?.isHr) {
        setIsHr(true);
      }
      if (value?.data()?.fullName) {
        setNameFilled(true);
      } else {
        setNameFilled(false);
      }
    }
  }, [value]);

  return (
    <UserContext.Provider
      value={{
        isHr,
        isManager,
        setIsHr,
        setIsManager,
        nameFilled,
        setNameFilled,
        value,
        mainLoading,
        setMainLoading,
      }}
    >
      <div className="relative  flex min-h-screen flex-col">
        <div className="sticky z-[40] top-0 flex w-full bg-primary py-4 text-center ">
          <div className="container flex justify-between  text-white">
            <div className="text-normal md:text-xl lg:text-2xl font-bold flex items-center gap-4">
              Monkie HRMS
              {isHr ? (
                <Badge className="bg-red-500  hidden sm:block text-xs">
                  HR ADMIN
                </Badge>
              ) : isManager ? (
                <Badge className="bg-orange-500  hidden sm:block text-xs">
                  Manager
                </Badge>
              ) : (
                <Badge className="bg-green-500  hidden sm:block text-xs">
                  Employee
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                Hi,
                <span className="font-semibold">
                  {value?.data()?.fullName
                    ? value?.data()?.fullName
                    : user.email}
                </span>
              </div>

              <Button
                onClick={() => signout()}
                variant={"secondary"}
                className="px-2 md:px-3"
              >
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
