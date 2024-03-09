"use client";

// ? =================================
// ? This is for the Manager and Employee to SEE, So he/she can see the status of the leaves.
// ? =================================

import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase/config/firebaseConfig";
import { useIdToken } from "react-firebase-hooks/auth";
import { UserContext } from "@/components/Contexts/UserContext";

export default function LeavesApplied() {
  const { mainLoading, setMainLoading } = useContext(UserContext);
  const [user] = useIdToken(auth);
  const [appliedLeavesList, setAppliedLeavesList] = useState([{}]);
  const appliedLeavesRef = collection(db, "appliedleaves");
  const [loading, setLoading] = useState(true);
  const q = query(appliedLeavesRef, where("uid", "==", user?.uid));
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
        setMainLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    gettingDocs();
  }, [mainLoading]);

  return (
    <div className="pt-3">
      <h3 className="font-semibold text-xl pb-4">Leave(s) Applied</h3>
      <div className="bg-blue-100/30 rounded-md py-4 pt-2 px-4">
        <Table>
          <TableCaption>A list of your recent applied leave(s).</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          {!loading &&
            appliedLeavesList.map((item, index) => {
              return (
                <TableBody key={index}>
                  <TableRow>
                    <TableCell className="font-medium">
                      {item?.startdate.toDate().toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {item?.enddate.toDate().toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={"default"}>{item?.leavetype}</Badge>
                    </TableCell>
                    <TableCell>{item?.reason}</TableCell>
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
                </TableBody>
              );
            })}
        </Table>
      </div>
    </div>
  );
}
