"use client";

// ? =================================
// ? This is for the Manager and HR to SEE, So he/she can approve leaves.
// ? =================================

import React from "react";
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

export default function LeavesApproved({
  approvedList,
  loading,
}: {
  approvedList: any[];
  loading: boolean;
}) {
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
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!loading &&
              approvedList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.fullName}</TableCell>
                  <TableCell>
                    {item.startdate.toDate().toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {item.enddate.toDate().toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={"default"}>
                      {item.leavetype.toUpperCase()}
                    </Badge>
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
