export default async function SelectedProduct( id : string ) {
  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
  let { data } = await response.json();

  console.log(data);

return data

}