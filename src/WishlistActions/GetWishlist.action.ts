"use server";

import getMyToken from "@/utilities/getMyToken";

export default async function GetWishlist() {
  const token = await getMyToken();

  if (!token) {
    return { status: "error", message: "You must be logged in" };
  }

  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    headers: { token },
  });

  let payload = await res.json();
  return payload;
}
