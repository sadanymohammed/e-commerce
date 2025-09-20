"use server";

export default async function getRelatedProducts(catId: string) {
  let res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`
  );
  let payload = await res.json();
  return payload;
}
