"use client";

import React, { ContextType, useContext } from "react";

import ApproveLeaves from "./approveleaves";
import CreateEmployeeLogin from "./createemployeelogin";
import { UserContext } from "@/components/Contexts/UserContext";
import LeavesApplied from "./leavesapplied";
import ApplyLeaveDrawer from "./applydrawer";
import { db } from "@/firebase/config/firebaseConfig";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useIdToken } from "react-firebase-hooks/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth } from "@/firebase/config/firebaseConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import { redirect } from "next/navigation";
import LeavesApproved from "./leavesapproved";

export default function Page() {
  const [user] = useIdToken(auth);

  const { isHr, nameFilled, setNameFilled, isManager } =
    useContext(UserContext);

  type Inputs = {
    fullName: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(data.fullName, user?.uid);
      const userDataRef = doc(db, "users", `${user?.uid}`);

      await updateDoc(userDataRef, {
        fullName: data.fullName,
      });
      setNameFilled(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen flex-1 py-5">
      <div className="flex w-full justify-center">
        {!isHr && <ApplyLeaveDrawer />}
      </div>
      {!isHr && (
        <div>
          <LeavesApplied />
        </div>
      )}
      {(isManager || isHr) && (
        <>
          <div>
            <ApproveLeaves />
          </div>
          <div>
            <LeavesApproved />
          </div>
        </>
      )}
      <div>
        <Dialog open={nameFilled ? false : true}>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-xl">Please enter your fullname</p>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullName" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    className="col-span-3"
                    defaultValue=""
                    {...register("fullName", { required: true, minLength: 3 })}
                  />
                  <span
                    className={`${
                      errors.fullName ? "opacity-100" : "opacity-0"
                    } pt-2 text-red-400 text-xs`}
                  >
                    {errors.fullName?.type === "required"
                      ? "Fullname is a must"
                      : "Fullname must be 3 letters minimum"}
                  </span>
                </div>
              </div>
              <DialogFooter className="!justify-center">
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
