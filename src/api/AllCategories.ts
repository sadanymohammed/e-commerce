export default async function AllCategories() {
  // https://ecommerce.routemisr.com/api/v1/categories
  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories`
  );
  let { data } = await response.json();

  return data;
}