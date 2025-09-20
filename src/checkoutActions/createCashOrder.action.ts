"use server";

import getMyToken from "@/utilities/getMyToken";

export default async function cashCheckout(cartId: string, values: { details: string; phone: string; city: string }) {
  try {
    const token = await getMyToken();
    if (!token) return { status: "error", message: "You must be logged in" };

    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        shippingAddress: {
          details: values.details,
          phone: values.phone,
          city: values.city,
        },
      }),
    });

    let data = await res.json();
    return data;

  } catch (error) {
    console.error("Cash Checkout Error:", error);
    return { status: "error", message: "Something went wrong" };
  }
}
