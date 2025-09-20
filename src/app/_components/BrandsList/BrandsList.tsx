import React from "react";
import getBrands from "@/app/brandsActions/getBrands.action";
import Link from "next/link";
import Image from "next/image";

export default async function BrandsList() {
  const brandsRes = await getBrands();
  const brands = brandsRes?.data || [];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand: any) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`} 
            className="border rounded-lg p-4 flex flex-col items-center hover:shadow-md transition"
          >
            {brand.image && (
              <Image
                src={brand.image}
                alt={brand.name}
                width={100}
                height={100}
                className="object-contain mb-2"
              />
            )}
            <span className="text-center font-medium">{brand.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
