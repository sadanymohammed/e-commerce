"use server";

import getMyToken from "@/utilities/getMyToken";

export default async function AddToCart(id: string) {
  try {
    const token = await getMyToken();
    if (!token) {
      throw new Error("You must be logged in to add to cart");
    }

    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    let payload = await res.json();
    return payload;
  } catch (err) {
    console.log(err);
    return err;
  }
}
