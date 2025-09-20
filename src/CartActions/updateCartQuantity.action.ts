
  'use server'

import getMyToken from "@/utilities/getMyToken";

       export default async function updateCartQuantity(id: string, count: number) {
        const token = await getMyToken();
        if (!token) {
          throw new Error("You must be logged in to add to cart");
        }
    
        let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
          method: "PUT",
          headers: {
            token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ count }),
        });
    
        let payload = await res.json();
        return payload;
       }