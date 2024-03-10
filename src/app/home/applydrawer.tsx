"use client";

// ? =================================
// ? This is for the Manager and Employee to SEE, So he/she can apply leaves.
// ? =================================

import React, { useContext, useState } from "react";
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
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/config/firebaseConfig";
import { useIdToken } from "react-firebase-hooks/auth";
import { UserContext } from "@/components/Contexts/UserContext";

export default function ApplyLeaveDrawer() {
  const [user] = useIdToken(auth);

  const { setMainLoading } = useContext(UserContext);

  const [mainDialog, setMainDialog] = useState<boolean>();
  const [leavetype, setLeaveType] = useState<string>();
  const [startdate, setStartdate] = useState<Date>();
  const [enddate, setEnddate] = useState<Date>();
  const [reason, setReason] = useState<string>();
  const [fill, setFill] = useState<boolean>();
  const { value } = useContext(UserContext);
  const handleSubmit = async () => {
    if (leavetype && startdate && enddate && reason) {
      await addDoc(collection(db, "appliedleaves"), {
        uid: user?.uid,
        fullName: value?.data()?.fullName,
        startdate,
        enddate,
        leavetype,
        reason,
        status: 1,
        timestamp: serverTimestamp(),
      });
      setMainLoading && setMainLoading(true);
      setMainDialog(false);
      setLeaveType("");
      setStartdate(undefined);
      setEnddate(undefined);
      setReason("");
    } else {
      setFill(true);
    }
  };
  return (
    <>
      <Dialog open={mainDialog} onOpenChange={setMainDialog}>
        <DialogTrigger asChild>
          <Button>Apply for Leave</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Application for Leave(s)</DialogTitle>
            <DialogDescription>
              Fill the form to apply for a leave.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Type
              </Label>
              <Select value={leavetype} onValueChange={(e) => setLeaveType(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type of leaves</SelectLabel>
                    <SelectItem value="sick">Sick leave</SelectItem>
                    <SelectItem value="casual">Casual leave</SelectItem>
                    <SelectItem value="emergency">Emergency leave</SelectItem>
                    <SelectItem value="study">Study leave</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Start Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !startdate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startdate ? (
                      format(startdate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startdate}
                    onSelect={setStartdate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                End Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !enddate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {enddate ? (
                      format(enddate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={enddate}
                    onSelect={setEnddate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="message">Mention a Reason</Label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Type your message here."
                id="message"
              />
              <p className="text-sm text-muted-foreground">
                Enter an adequate reason.
              </p>
            </div>
          </div>
          <DialogFooter className="justify-start">
            <Button type="submit" onClick={() => handleSubmit()}>
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={fill}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Please fill all the fields</AlertDialogTitle>
            <AlertDialogDescription>
              Each and every field must be filled!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setFill(false)}>
              Alright!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
