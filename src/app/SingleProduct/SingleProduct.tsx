import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/product.type";
import AddBtn from "../_components/AddBtn/AddBtn";
import WishlistBtn from "../_components/WishlistBtn/WishlistBtn";

export default function SingleProduct({
  currentProduct,
  wishlistIds = [],
}: {
  currentProduct: ProductType;
  wishlistIds?: string[];
}) {
  const pid = currentProduct._id;
  const isInWishlist = wishlistIds.includes(pid);

  return (
    <Card className="flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-105">
      <Link href={`/products/${pid}`} className="flex flex-col flex-grow">
        <CardContent className="flex justify-center items-center p-5">
          <Image
            width={180}
            height={180}
            src={currentProduct.imageCover}
            alt={currentProduct.title}
            className="object-contain h-44 w-full"
            priority
          />
        </CardContent>

        <CardHeader className="text-center px-4 py-2 flex-grow">
          <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
            {currentProduct.title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 mt-1 line-clamp-1">
            {currentProduct.category?.name || "No Category"}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-between items-center px-4 py-3 bg-gray-50">
          <span className="font-bold text-base text-gray-900">
            {currentProduct.price} EGP
          </span>
          <span className="text-sm text-gray-600 flex items-center gap-1">
            {currentProduct.ratingsAverage || "N/A"}
            <i className="fas fa-star text-yellow-500"></i>
          </span>
        </CardFooter>
      </Link>

      <div className="flex justify-center gap-2 p-3 border-t">
        <AddBtn id={pid} />
        <WishlistBtn productId={pid} initialInWishlist={isInWishlist} />
      </div>
    </Card>
  );
}
