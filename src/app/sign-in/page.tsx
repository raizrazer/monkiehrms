import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
export default function page() {
  return (
    <>
      <main className="container flex min-h-full w-full flex-1 items-center justify-center">
        <div className="flex max-w-[460px] flex-col items-center justify-center gap-6 rounded-md border-[1px] border-black bg-primary-foreground p-6">
          <h2 className="text-2xl font-semibold">Sign In</h2>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <Button>Sign In</Button>
        </div>
      </main>
    </>
  );
}
