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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function ApproveLeaves() {
  return (
    <div className="pt-3">
      <h3 className="font-semibold text-xl pb-4">Leave(s) to Approve</h3>
      <div className="bg-blue-100/30 rounded-md py-4 pt-2 px-4">
        <Table>
          <TableCaption>A list of your recent applied leave(s).</TableCaption>
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
            <TableRow>
              <TableCell className="font-medium">Mohammed Raiz</TableCell>
              <TableCell>01/01/2024</TableCell>
              <TableCell>02/02/2024</TableCell>
              <TableCell>
                <Badge variant={"default"}>Sick leave</Badge>
              </TableCell>
              <TableCell>I am feeling sick</TableCell>
              <TableCell className="text-center whitespace-nowrap">
                <Button
                  variant={"secondary"}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-none rounded-l"
                >
                  <CheckIcon className="size-6" />
                </Button>
                <Button
                  variant={"secondary"}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-none rounded-r "
                >
                  <Cross2Icon className="size-6" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
