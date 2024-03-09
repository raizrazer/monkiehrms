"use client";

// ? =================================
// ? This is for the Manager and HR to SEE, So he/she can approve leaves.
// ? =================================

import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/components/Contexts/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config/firebaseConfig";

import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { clearTimeout } from "timers";
export default function ApproveLeaves() {
  const { value } = useContext(UserContext);
  const [appliedLeavesList, setAppliedLeavesList] = useState([{}]);
  const appliedLeavesRef = collection(db, "appliedleaves");
  const [loading, setLoading] = useState(true);
  const q = query(appliedLeavesRef, where("status", "==", 1));
  useEffect(() => {
    const gettingDocs = async () => {
      try {
        const querySnapshot = await getDocs(q);
        setLoading(true);
        const userDataArray: any[] = [];
        querySnapshot.forEach((doc) => {
          userDataArray.push({ id: doc.id, ...doc.data() });
        });
        userDataArray.sort((a, b) => b.timestamp - a.timestamp);
        setAppliedLeavesList(userDataArray);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    gettingDocs();
  }, []);

  const router = useRouter();

  const refresh = () => {
    const timeout = setTimeout(() => router.refresh(), 200);
    clearTimeout(timeout);
  };

  console.log(appliedLeavesList);
  const approveLeave = async (e) => {
    console.log(e.target.id);
    const approveLocation = doc(db, "appliedleaves", `${e.target.id}`);
    try {
      await updateDoc(approveLocation, {
        status: 2,
      });
      return refresh();
    } catch (e) {
      console.log(e);
    }
  };
  const rejectLeave = async () => {
    console.log(e.target.id);
    const approveLocation = doc(db, "appliedleaves", `${e.target.id}`);
    try {
      await updateDoc(approveLocation, {
        status: 0,
      });
      return refresh();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="pt-3">
      <h3 className="font-semibold text-xl pb-4">Leave(s) to Approve</h3>
      <div className="bg-blue-100/30 rounded-md py-4 pt-2 px-4">
        <Table>
          <TableCaption>A list of leaves to decide.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-center">Approval</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!loading &&
              appliedLeavesList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.fullName}</TableCell>
                  <TableCell>
                    {item.startdate.toDate().toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {item.enddate.toDate().toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={"default"}>{item.leavetype}</Badge>
                  </TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    <Button
                      variant={"secondary"}
                      id={item.id}
                      className="bg-green-500 hover:bg-green-600 text-white rounded-none rounded-l"
                      onClick={(e) => approveLeave(e)}
                    >
                      <CheckIcon className="size-6 pointer-events-none" />
                    </Button>
                    <Button
                      variant={"secondary"}
                      id={item.id}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-none rounded-r "
                    >
                      <Cross2Icon className="size-6 pointer-events-none" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
