"use server";

import getMyToken from "@/utilities/getMyToken";

export default async function AddToWishlist(productId: string) {
  const token = await getMyToken();

  if (!token) {
    return { status: "error", message: "You must be logged in" };
  }
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  let payload = await res.json();
  return payload;
  
}
