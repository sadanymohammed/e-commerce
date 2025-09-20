"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema, loginSchemaForm } from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import Link from "next/link";
export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<loginSchemaForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // Login function
  async function handleLogin(values: loginSchemaForm) {
    let response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    // try {
    //   setLoading(true);
    //   const res = await axios.post(
    //     "https://ecommerce.routemisr.com/api/v1/auth/signin",
    //     values
    //   );

    //   if (res.data.message === "success") {
    //     toast.success("Login successful!", {
    //       position: "top-center",
    //       duration: 3000,
    //     });
    //     router.push("/");
    //   }
    // } catch (err: any) {
    //   const errorMessage =
    //     err.response?.data?.message || "Something went wrong, please try again";
    //   toast.error(errorMessage, {
    //     position: "top-center",
    //     duration: 3000,
    //   });
    // } finally {
    //   setLoading(false);
    // }
    if (response?.ok) {
      toast.success("Login successful!", {
        position: "top-center",
        duration: 3000,
      });
      router.push("/");
    } else {
      toast.error(response?.error || "Something went wrong, please try again", {
        position: "top-center",
        duration: 3000,
      });
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12 ">
        <h1 className="text-3xl text-center font-bold my-4"> Login Now </h1>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(handleLogin)}>
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Email : </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Password : </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              className=" my-4 text-purple-700 cursor-pointer"
              href="/forgot-password"
            >
              {" "}
              Forgot your password ? 🤔{" "}
            </Link>

            <Button
              type="submit"
              disabled={loading}
              className="mt-4 cursor-pointer w-full bg-emerald-500"
            >
              {loading ? "Login..." : "Login Now"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
