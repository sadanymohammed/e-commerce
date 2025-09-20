"use client";

import { useTransition, useState } from "react";
import { Heart } from "lucide-react";
import AddToWishlist from "@/WishlistActions/addToWishlist.action";
import RemoveFromWishlist from "@/WishlistActions/RemoveFromWishlist.action";
import { toast } from "sonner";

export default function WishlistBtn({
  productId,
  initialInWishlist = false,
}: {
  productId: string;
  initialInWishlist?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [inWishlist, setInWishlist] = useState(initialInWishlist);

  async function handleClick() {
    startTransition(async () => {
      if (inWishlist) {
        // remove
        const res = await RemoveFromWishlist(productId);
        if (res?.status === "success" || res?.message === "success") {
          setInWishlist(false);
          toast.success("Removed from wishlist ❌", {
            duration: 3000,
            position: "top-center",
          });
        }
      } else {
        // add
        const res = await AddToWishlist(productId);
        if (res?.status === "success" || res?.message === "success") {
          setInWishlist(true);
          toast.success("Added to wishlist ❤️", {
            duration: 3000,
            position: "top-center",
          });
        }
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="p-2 transition cursor-pointer"
    >
      <Heart
        size={22}
        className={`transition-colors ${
          isPending ? "opacity-50" : ""
        }`}
        stroke={inWishlist ? "red" : "gray"}
        fill={inWishlist ? "red" : "none"}
      />
    </button>
  );
}
