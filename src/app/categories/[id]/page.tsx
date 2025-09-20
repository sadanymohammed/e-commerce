"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

export default function CategoryProductsPage() {
  const params = useParams();
  const categoryId = params?.id as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!categoryId) {
        setError("Invalid category ID");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data.data || []);
        setError(null); // reset error
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-12">
        <h1 className="text-red-500 text-xl font-bold mb-4">{error}</h1>
        <Link href="/categories" className="text-blue-500 underline">
          Back to Categories
        </Link>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <h1 className="text-center text-2xl font-bold mt-12 text-gray-500">
        No products found in this category
      </h1>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 px-4 sm:px-8 lg:px-12">
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition flex flex-col items-center text-center cursor-pointer">
              <div className="w-full max-w-[120px] h-32 flex items-center justify-center mb-3">
                <Image
                  width={120}
                  height={120}
                  src={product.imageCover}
                  alt={product.title}
                  className="rounded-md object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <h2 className="text-base font-semibold mt-3 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-green-600 font-bold mt-2">
                EGP {product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
