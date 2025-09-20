export default async function getProducts() {
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products` ,{
    method: 'GET',
    next: {
      revalidate: 60
    }

  });
  let { data } = await response.json();

  return data;
}
