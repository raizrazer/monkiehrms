"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIdToken } from "react-firebase-hooks/auth";

import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "@/firebase/config/firebaseConfig";
import { redirect } from "next/navigation";

import SignInFunction from "@/firebase/signin";
import Link from "next/link";

// Type for the Input of the Sign In Form
type Inputs = {
  email: string;
  password: string;
};
export default function SignInForm() {
  const [user, loading, error] = useIdToken(auth);

  // React Hooks Functions for the handling of the inputs.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Submit Handler Function when the User submits the Sign In form.
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await SignInFunction(data.email, data.password);
    } catch (e) {}
  };

  // If the user is present, it will redirect to the /home page.
  if (user) {
    return redirect("/home");
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: `${!user ? "flex" : "none"}` }}
      className="flex max-w-[460px] flex-col items-center justify-center gap-6 rounded-md border-[1px] border-black bg-primary-foreground p-6"
    >
      <h2 className="text-2xl font-semibold">Sign In</h2>
      <div className="flex flex-col gap-1">
        <div>
          <Label htmlFor="email">Email</Label>
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
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 8 })}
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
      </div>
      {error && (
        <span className={`pt-2 text-red-400 text-xs`}>Invalid Password</span>
      )}
      <Button
        variant={loading ? "ghost" : "default"}
        disabled={loading ? true : false}
      >
        Sign In
      </Button>
      <div className="flex flex-col">
        <p>If you want to create an account, </p>
        <Link
          href={"/sign-up"}
          className="font-semibold text-center underline text-blue-950 "
        >
          Click Here To Sign Up
        </Link>
      </div>
    </form>
  );
}
