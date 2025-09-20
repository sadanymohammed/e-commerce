export default async function getBrand(brandId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
  );
  if (!res.ok) throw new Error("Failed to fetch brand");
  return res.json();
}
