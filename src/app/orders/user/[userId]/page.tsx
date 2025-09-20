import React from "react";
import { getUserOrders } from "@/api/orders.api";
import SingleProduct from "@/app/SingleProduct/SingleProduct";
import Link from "next/link";

type UserOrdersPageProps = {
  params: { userId: string };
};

export default async function UserOrdersPage({ params }: UserOrdersPageProps) {
  const { userId } = params;

  if (!userId || userId === "undefined") {
    return (
      <div className="container max-w-7xl mx-auto my-12 text-center">
        <h1 className="text-3xl font-bold text-red-600">Invalid User ID</h1>
        <p className="text-gray-600 mt-2">Please log in to view your orders.</p>
        <a
          href="/login"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </a>
      </div>
    );
  }

  let products = [];

  try {
    const orders = await getUserOrders(userId);

    products = orders.flatMap((order) =>
      order.cartItems.map((item) => ({
        ...item.product,
        count: item.count,
      }))
    );
  } catch (err) {
    console.error("Error fetching user orders:", err);
    return (
      <div className="container max-w-7xl mx-auto my-12 text-center">
        <h1 className="text-3xl font-bold text-red-600">Error Loading Orders</h1>
        <p className="text-gray-600 mt-2">Something went wrong while fetching your orders.</p>
        <a
          href="/orders"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Orders
        </a>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Your Ordered Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={`${product._id}-${index}`}
              className="relative transform transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden"
            >
              <SingleProduct currentProduct={product} />
              {product.count > 1 && (
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-sm font-medium rounded-full px-3 py-1 shadow-md">
                  x{product.count}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-100 rounded-lg border border-gray-300">
          <p className="text-lg text-gray-700">No products found in your orders.</p>
          <Link
            href="/products"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
}