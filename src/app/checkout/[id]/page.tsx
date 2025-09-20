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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { checkoutSchema, checkoutSchemaType } from "@/schema/checkout.schema";
import onlinePayment from "@/checkoutActions/onlineCheckout.action";
import cashCheckout from "@/checkoutActions/createCashOrder.action";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const { id }: { id: string } = useParams(); // cartId
  const searchParams = useSearchParams();
  const method = searchParams.get("method"); // visa or cash
  const router = useRouter();

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handleCheckout(values: checkoutSchemaType) {
    setLoading(true);
    try {
      let res;

      if (method === "visa") {
        // Online payment
        res = await onlinePayment(id, "", values);
        if (res.status === "success") {
          window.location.href = res.session.url;
        } else {
          toast.error("Payment failed");
        }
      } else {
        // Cash on Delivery
        res = await cashCheckout(id, values);
        if (res.status === "success") {
             router.push("/cart");
          toast.success("Order placed successfully (Cash on Delivery)", {
            duration: 3000,
            position: "top-center",
          });
        } else {
          toast.error("Cash order failed");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-1/2 mx-auto my-12">
      <h1 className="text-3xl text-center font-bold my-4">Checkout</h1>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleCheckout)}>
          {/* details */}
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details:</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your Details" {...field} />
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
                <FormLabel>Phone Number:</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Enter your Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* city */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City:</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your City" {...field} />
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
            {loading
              ? "Processing..."
              : method === "visa"
              ? "Pay with Visa"
              : "Cash on Delivery"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
