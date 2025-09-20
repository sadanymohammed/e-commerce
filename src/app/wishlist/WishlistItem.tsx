"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RemoveFromWishlist from "@/WishlistActions/RemoveFromWishlist.action";
import { toast } from "sonner";

export default function WishlistItem({ product }: { product: any }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRemove = () => {
    startTransition(async () => {
      await RemoveFromWishlist(product._id);
      router.refresh();
      toast.success("Product removed from wishlist successfully ✅", {
        duration: 3000,
        position: "top-center",
      });
    });
  };

  return (
    <div
      key={product._id}
      className="border rounded-lg p-4 shadow hover:shadow-lg transition relative"
    >
      <Link href={`/products/${product._id}`}>
        <Image
          src={product.imageCover}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-48 object-contain"
        />
        <h3 className="font-semibold mt-2">{product.title}</h3>
        <p className="text-emerald-600 font-bold">{product.price} EGP</p>
      </Link>

      <button
        onClick={handleRemove}
        disabled={isPending}
        className={`absolute top-2 right-2 transition ${
          isPending
            ? "text-gray-400 cursor-not-allowed"
            : "text-red-500 hover:text-red-700"
        }`}
      >
        {isPending ? (
          <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
        ) : (
          <i className="fa-solid fa-heart-crack text-2xl"></i>
        )}
      </button>
    </div>
  );
}
