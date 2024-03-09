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

export default function LeavesApproved() {
  const { value } = useContext(UserContext);
  const [appliedLeavesList, setAppliedLeavesList] = useState([{}]);
  const appliedLeavesRef = collection(db, "appliedleaves");
  const [loading, setLoading] = useState(true);
  const q = query(appliedLeavesRef, where("status", "!=", 1));
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

  console.log(appliedLeavesList);
  return (
    <div className="pt-3">
      <h3 className="font-semibold text-xl pb-4">Approved Leave(s)</h3>
      <div className="bg-blue-100/30 rounded-md py-4 pt-2 px-4">
        <Table>
          <TableCaption>A list of approved leaves.</TableCaption>
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
                  <TableCell className="text-center">
                    {item.status > 1 ? (
                      <div className="bg-green-500 text-white py-2 rounded">
                        Approved
                      </div>
                    ) : item.status < 1 ? (
                      <div className="bg-red-500 text-white py-2 rounded">
                        Rejected
                      </div>
                    ) : (
                      <div className="bg-blue-500 text-white py-2 rounded">
                        Processing
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
