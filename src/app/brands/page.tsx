import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import BrandsList from '../_components/BrandsList/BrandsList';
import getBrands from '../brandsActions/getBrands.action'; 
import Link from 'next/link';

export default async function Brands() {
  const session = await getServerSession(authOptions);

  const brandsResponse = await getBrands();
const brands = brandsResponse.data; 


  return (
    <div className="container w-[80%] mx-auto my-12">
      <h1 className="text-2xl font-bold mb-6">Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {brands.map((brand: any) => (
          <Link key={brand._id} href={`/brands/${brand._id}`}>
            <div className="flex flex-col items-center cursor-pointer p-4 border rounded-md hover:shadow-md transition">
              {brand.image && (
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="h-16 w-16 object-cover mb-2 rounded-full"
                />
              )}
              <span className="text-center font-medium">{brand.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
