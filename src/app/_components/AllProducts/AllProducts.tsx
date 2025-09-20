import getProducts from '@/api/products.api';
import SingleProduct from '@/app/SingleProduct/SingleProduct';
import { ProductType } from '@/types/product.type';
import React from 'react';
import GetWishlist from '@/WishlistActions/GetWishlist.action'; 

export default async function AllProducts() {
  const data = await getProducts();

  const wishlistRes = await GetWishlist();
  const wishlistItems = wishlistRes?.data || [];

  const wishlistIds = wishlistItems.map((item: any) => item._id);

  return (
    <div className="container w-[80%] mx-auto my-12">
      <h1 className="text-3xl font-bold text-center mb-10">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((currentProduct: ProductType) => (
          <SingleProduct
            key={currentProduct._id}
            currentProduct={currentProduct}
            wishlistIds={wishlistIds}
          />
        ))}
      </div>
    </div>
  );
}
