import SelectedProduct from "@/api/SelectedProduct";
import SingleProduct from "@/app/SingleProduct/SingleProduct";
import { Button } from "@/components/ui/button";
import Details from "@/components/ui/Details/Details";
import getRelatedProducts from "@/ProductCategoryAction/relatedProducts.action";
import { ProductType } from "@/types/product.type";
import React from "react";

async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params;
  // https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b

  let data = await SelectedProduct(id);
  if (!data) return <h1>No Products Here </h1>;
  let RelatedProducts = await getRelatedProducts(data.category._id);
  

  return (
    <>
      <Details data={data} />
      <div className="container w-[80%] mx-auto my-12">
        <div className="flex flex-wrap">
          {RelatedProducts.data.map((currentProduct: ProductType) => (
            <SingleProduct key={currentProduct.id} currentProduct={currentProduct} />
          ))}
        </div>
      </div>

    </>
  );
}

export default ProductDetails;
