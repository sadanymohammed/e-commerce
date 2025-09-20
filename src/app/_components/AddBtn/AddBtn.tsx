"use client";

import AddToCart from "@/CartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import getMyToken from "@/utilities/getMyToken";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

export default function AddBtn({ id }: { id: string }) {
  const { numberOfCartItem, setNumberOfCartItem } = useContext(CartContext);

  const [loadingAdd, setLoadingAdd] = useState(false);

  async function checkAddProduct(id: string) {
    try {
    
      const token = getMyToken();
      if (!token) {
        toast.error("Login first to add items 😶", {
          duration: 3000,
          position: "top-center",
        });
        return; 
      }

      setLoadingAdd(true);
      let res = await AddToCart(id);

      if (res.status === "success") {
        toast.success(res.message + " ❤️", {
          duration: 3000,
          position: "top-center",
        });
        setNumberOfCartItem(numberOfCartItem + 1);
      } else {
        toast.error("You must be logged in 😶", {
          duration: 3000,
          position: "top-center",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setLoadingAdd(false);
    }
  }

  return (
    <Button
      disabled={loadingAdd}
      onClick={() => checkAddProduct(id)}
      className="bg-emerald-600 text-white w-2/3 px-3 py-1 rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loadingAdd ? (
        <i className="fas fa-spinner fa-spin mr-2"></i>
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
}
