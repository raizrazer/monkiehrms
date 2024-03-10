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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
export default function ApproveLeaves({
  approvallist,
  loading,
  approveLeave,
  rejectLeave,
}: {
  approvallist: any[];
  loading: boolean;
  approveLeave: Function;
  rejectLeave: Function;
}) {
  return (
    <div className="pt-3">
      <h3 className="font-semibold text-base md:text-xl pb-4">
        Leave(s) to Approve
      </h3>
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
              approvallist.map((item, index) => (
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
                      onClick={(e) => rejectLeave(e)}
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
