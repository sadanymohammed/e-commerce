import React from "react";
import GetWishlist from "@/WishlistActions/GetWishlist.action";
import WishlistItem from "./WishlistItem";

export default async function WishlistPage() {
  const wishlist = await GetWishlist();

  if (wishlist?.status === "error") {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-xl font-semibold text-red-500">
          {wishlist.message}
        </h2>
        <p className="mt-2">Please login to see your wishlist.</p>
      </div>
    ) 
  }

  const products = wishlist?.data || [];

  if (products.length === 0) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-xl font-semibold">Your wishlist is empty 💔</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">My Wishlist ❤️</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <WishlistItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
