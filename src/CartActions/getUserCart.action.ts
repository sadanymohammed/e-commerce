"use server";

import getMyToken from "@/utilities/getMyToken";

export default async function getLoggedUserCart() {
  let token = await getMyToken();

  if (!token) {
    throw new Error("You must be logged in to get your cart");
  }

  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: {
      token,
      "content-type": "application/json",
    },
  });
  let payload = await res.json();
  return payload;
}
