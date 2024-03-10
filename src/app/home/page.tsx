"use client";

import React, { useContext, useEffect, useState } from "react";

import { Switch } from "@/components/ui/switch";

import ApproveLeaves from "./approveleaves";
import { UserContext } from "@/components/Contexts/UserContext";
import LeavesApplied from "./leavesapplied";
import ApplyLeaveDrawer from "./applydrawer";
import { db } from "@/firebase/config/firebaseConfig";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { DocumentData } from "firebase/firestore";
import { useIdToken } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth } from "@/firebase/config/firebaseConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import LeavesApproved from "./leavesapproved";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

type MemberValue = {
  id: string;
  uid: string;
  fullName: string;
  isHr: boolean;
  isManager: boolean;
};

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
      const userDataRef = doc(db, "users", `${user?.uid}`);

      await updateDoc(userDataRef, {
        fullName: data.fullName,
      });
      setNameFilled && setNameFilled(true);
    } catch (e) {
      console.error(e);
    }
  };

  // ! APPROVES LEAVES SECTION
  const [loading, setLoading] = useState(true);

  const [approvalList, setApprovalList] = useState([{}]);
  const approvalListRef = collection(db, "appliedleaves");
  const q = query(approvalListRef, where("status", "==", 1));
  useEffect(() => {
    const gettingDocs = async () => {
      try {
        const querySnapshot = await getDocs(q);
        // setLoading(true);
        const userDataArray: any[] = [];
        querySnapshot.forEach((doc) => {
          userDataArray.push({ id: doc.id, ...doc.data() });
        });
        userDataArray.sort((a, b) => b.timestamp - a.timestamp);
        setApprovalList(userDataArray);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    gettingDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const approveLeave = async (e: { target: { id: any } }) => {
    const approveLocation = doc(db, "appliedleaves", `${e.target.id}`);
    try {
      await updateDoc(approveLocation, {
        status: 2,
      });
      setLoading(true);
    } catch (e) {
      console.error(e);
    }
  };
  const rejectLeave = async (e: { target: { id: any } }) => {
    const approveLocation = doc(db, "appliedleaves", `${e.target.id}`);
    try {
      await updateDoc(approveLocation, {
        status: 0,
      });
      setLoading(true);
    } catch (e) {
      console.error(e);
    }
  };
  // ! LEAVES APPROVED SECTION
  const [approvedLeavesList, setAppliedLeavesList] = useState([{}]);
  const approvedLeavesRef = collection(db, "appliedleaves");
  const qa = query(approvedLeavesRef, where("status", "!=", 1));
  useEffect(() => {
    const gettingDocs = async () => {
      try {
        const querySnapshot = await getDocs(qa);
        // setLoading(true);
        const userDataArray: any[] = [];
        querySnapshot.forEach((doc) => {
          userDataArray.push({ id: doc.id, ...doc.data() });
        });
        userDataArray.sort((a, b) => b.timestamp - a.timestamp);
        setAppliedLeavesList(userDataArray);
        // setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    gettingDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // ! MEMBER LIST SECTION
  const [memberList, setMemberList] = useState<MemberValue[]>([]);
  const membersListRef = collection(db, "users");
  const mbl = query(membersListRef);
  useEffect(() => {
    const gettingDocs = async () => {
      try {
        const querySnapshot = await getDocs(mbl);
        // setLoading(true);
        const userDataArray: MemberValue[] = [];
        querySnapshot.forEach((doc: DocumentData) => {
          userDataArray.push({ id: doc.id, ...doc.data() });
        });
        userDataArray.sort((a, b) => a.fullName.localeCompare(b.fullName));
        setMemberList(userDataArray);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    gettingDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  console.log(memberList);

  const changeManagerValue = async (id: string, cManager: boolean) => {
    const userRef = doc(db, "users", `${id}`);
    try {
      console.log("Try this", id, isManager);
      await updateDoc(userRef, {
        isManager: !cManager,
      });
      setLoading(true);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="min-h-screen flex-1 py-5">
      {!isHr && (
        <div className="flex w-full justify-center">
          <ApplyLeaveDrawer />
        </div>
      )}
      {!isHr && (
        <div>
          <LeavesApplied />
        </div>
      )}
      {isHr && (
        <Sheet>
          <div className="w-full flex">
            <SheetTrigger className="ml-auto">
              <div className="bg-red-500 hover:bg-red-400 rounded-md p-3 font-semibold text-white">
                Grant User Roles
              </div>
            </SheetTrigger>
          </div>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Total Members</SheetTitle>
              <SheetDescription>
                <div className="flex flex-col gap-4">
                  {memberList &&
                    memberList.map((item, index) => (
                      <div
                        className="flex flex-col p-4 justify-center border-[1px] rounded-md border-gray-500"
                        key={index}
                      >
                        <p className=" text-foreground font-semibold">
                          {item.fullName}
                          <Badge
                            className={`ml-2 !text-[8px] ${
                              item.isManager ? `bg-green-500` : `bg-blue-500`
                            }`}
                          >
                            {item.isManager ? `Manager` : `Employee`}
                          </Badge>
                        </p>
                        <div className="flex flex-row items-center self-end gap-2">
                          <Switch
                            id={item.id}
                            // id="make-manager"
                            checked={item.isManager}
                            disabled={item.isHr}
                            onCheckedChange={() =>
                              changeManagerValue(item.id, item.isManager)
                            }
                          />
                          <Label htmlFor="make-manager">Make Manager</Label>
                        </div>
                      </div>
                    ))}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
      {(isManager || isHr) && (
        <>
          <div>
            <ApproveLeaves
              approveLeave={approveLeave}
              rejectLeave={rejectLeave}
              approvallist={approvalList}
              loading={loading}
            />
          </div>
          <div>
            <LeavesApproved
              approvedList={approvedLeavesList}
              loading={loading}
            />
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
