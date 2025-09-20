import React from "react";
import getBrand from "@/api/getBrand";
import getProducts from "@/api/products.api";
import SingleProduct from "@/app/SingleProduct/SingleProduct";
import Link from "next/link";

type BrandPageProps = {
  params: Promise<{ id: string }>;
};

const BrandPage = async ({ params }: BrandPageProps) => {
  const { id } = await params; 

 
  let brand: any;
  try {
    const res = await getBrand(id);
    brand = res?.data;
    if (!brand) throw new Error("Brand not found");
  } catch (err) {
    console.error("Error fetching brand:", err);
    return (
      <div className="container max-w-7xl mx-auto my-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">Brand not found</h1>
        <Link
          href="/brands"
          className="text-blue-600 underline mt-4 inline-block hover:text-blue-800 transition-colors"
        >
          Back to Brands
        </Link>
      </div>
    );
  }


  let products: any[] = [];
  try {
    const res = await getProducts({ brand: id });
    products = res?.data || [];
    products = products.map((p: any) => ({ ...p, id: p._id }));
  } catch (err) {
    console.error("Error loading products:", err);
    return (
      <div className="container max-w-7xl mx-auto my-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error loading products</h1>
        <Link
          href="/brands"
          className="text-blue-600 underline mt-4 inline-block hover:text-blue-800 transition-colors"
        >
          Back to Brands
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="flex items-center justify-center mb-8">
        {brand?.image && (
          <img
            src={brand.image}
            alt={brand.name}
            className="h-16 mr-4 rounded-md object-cover"
          />
        )}
        <h1 className="text-4xl font-bold text-gray-900">{brand?.name}</h1>
      </div>

      {/* Brand Products */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <SingleProduct key={product.id} currentProduct={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-lg text-gray-500">No products for this brand.</p>
          <Link
            href="/brands"
            className="text-blue-600 underline mt-4 inline-block hover:text-blue-800 transition-colors"
          >
            Explore Other Brands
          </Link>
        </div>
      )}
    </div>
  );
};

export default BrandPage;
