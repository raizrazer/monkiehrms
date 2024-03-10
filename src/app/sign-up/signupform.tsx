"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "@/firebase/config/firebaseConfig";
import { redirect } from "next/navigation";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Link from "next/link";

// Type for the Input of the Sign In Form
type Inputs = {
  email: string;
  password: string;
};

export default function SignUpForm() {
  // React Hooks Functions for the handling of the inputs.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // ! Creating Account SECTION
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // Submit Handler Function when the User submits the Sign Up form.
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      createUserWithEmailAndPassword(data.email, data.password);
    } catch (e) {}
  };

  // If the user is present, it will redirect to the /home page.
  if (user) {
    redirect("/home");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-[460px] flex-col items-center justify-center gap-6 rounded-md border-[1px] border-black bg-primary-foreground p-6"
    >
      <h2 className="text-2xl font-semibold">Sign Up</h2>
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
        Create an Account
      </Button>
      <div className="flex flex-col">
        <p>If you already have an account, </p>
        <Link
          href={"/sign-in"}
          className="font-semibold text-center underline text-blue-950 "
        >
          Click Here To Sign In
        </Link>
      </div>
    </form>
  );
}
