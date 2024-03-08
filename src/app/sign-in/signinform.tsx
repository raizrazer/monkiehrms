"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuthState } from "react-firebase-hooks/auth";

import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "@/firebase/config/firebaseConfig";

import { useRouter } from "next/navigation";

import signin from "@/firebase/signin";

export default function SignInForm() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      await signin(data.email, data.password);
    } catch (e) {
      // console.log(e);
    }
  };

  if (user) {
    router.push("/home");
  }

  console.log(user);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
    </form>
  );
}
