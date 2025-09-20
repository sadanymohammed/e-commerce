"use client";

import getLoggedUserCart from "@/CartActions/getUserCart.action";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CartContextType {
  numberOfCartItem: number;
  setNumberOfCartItem: Dispatch<SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [numberOfCartItem, setNumberOfCartItem] = useState<number>(0);

  async function getUserCart() {
    try {
      let res = await getLoggedUserCart();
      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setNumberOfCartItem(sum);
      }
    } catch (error) {
      console.log("not logged in");
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItem, setNumberOfCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
