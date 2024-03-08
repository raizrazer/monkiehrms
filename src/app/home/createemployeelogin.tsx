"use client";

// ? =================================
// ? This is for the HR to SEE, So he/she can create an account on behalf of the Employee/Manager.
// ? =================================

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";

export default function CreateEmployeeLogin() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a Employee Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Application for Leave(s)</DialogTitle>
          <DialogDescription>
            Fill the form to apply for a leave.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="email" className="text-right">
              Enter an Email
            </Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="password" className="text-right">
              Enter a Password
            </Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="airplane-mode">Is the employee a Manager</Label>
            <Switch id="airplane-mode" />
          </div>
        </div>
        <DialogFooter className="!justify-center">
          <Button type="submit">Create Employee Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
