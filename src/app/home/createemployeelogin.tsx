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

export default function CreateEmployeeLogin() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a Employee Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an account for an Employee</DialogTitle>
          <DialogDescription>
            Fill the form to create an employee account.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-4"
        >
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="email" className="text-right">
              Enter an Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              defaultValue=""
              {...register("email", { required: true })}
            />
            <span
              className={`${
                errors.email ? "opacity-100" : "opacity-0"
              } pt-2 text-red-400 text-xs`}
            >
              Enter an Email
            </span>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="password" className="text-right">
              Enter a Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              defaultValue=""
              {...register("password", { required: true })}
            />
            <span
              className={`${
                errors.password ? "opacity-100" : "opacity-0"
              } pt-2 text-red-400 text-xs`}
            >
              {errors.password?.type === "required"
                ? "Enter an Password"
                : "Password must be 8 digits minimum"}
            </span>
          </div>
          {/* <div className="flex items-center space-x-2">
            <Label htmlFor="manager">Is the employee a Manager</Label>
            <Switch
              id="manager"
              {...register("isManager")}
              onCheckedChange={(e) => {
                setValue("isManager", e);
              }}
            />
          </div> */}
          <DialogFooter className="!justify-center">
            <Button type="submit">Create Employee Account</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
