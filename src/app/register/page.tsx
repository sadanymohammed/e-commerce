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
import { registerSchema, RegisterSchemaType } from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  // register function
  async function handleRegister(values: RegisterSchemaType) {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (res.data.message === "success") {
        toast.success("Registration successful!", {
          position: "top-center",
          duration: 3000,
        });
        router.push("/login");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong, please try again";
      toast.error(errorMessage, {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12 ">
        <h1 className="text-3xl text-center font-bold my-4"> Register Now </h1>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleRegister)}
          >
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name : </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            {/* rePassword */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> RePassword : </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Repeat Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Phone : </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="mt-4 cursor-pointer w-full bg-emerald-500"
            >
              {loading ? "Registering..." : "Register Now"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
