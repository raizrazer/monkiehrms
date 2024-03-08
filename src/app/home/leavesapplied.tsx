"use client";
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

export default function LeavesApplied() {
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
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">01/01/2024</TableCell>
              <TableCell>02/02/2024</TableCell>
              <TableCell>
                <Badge variant={"default"}>Sick leave</Badge>
              </TableCell>
              <TableCell>I am feeling sick</TableCell>
              <TableCell className="text-center">
                <div className="bg-green-500 text-white py-2 rounded">
                  Approved
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
