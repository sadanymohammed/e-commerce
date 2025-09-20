"use client";
import getLoggedUserCart from "@/CartActions/getUserCart.action";
import removeItemFromCart from "@/CartActions/removeCartItem.action";
import updateCartQuantity from "@/CartActions/updateCartQuantity.action";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "./loading";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import clearCart from "@/CartActions/clearCart.action";
import { CartContext } from "@/context/CartContext";
import { CartProductType } from "@/types/cart.type";
import Link from "next/link";

export default function Cart() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removeDisable, setRemoveDisable] = useState(false);
  const [updateDisable, setUpdateDisable] = useState(false);
  const [loadingUpdateId, setLoadingUpdateId] = useState<string | null>(null);
  const { numberOfCartItem, setNumberOfCartItem } = useContext(CartContext);
  const [cartId, setCartId] = useState('')

  const [total, settotal] = useState(0);

  async function getuserCart() {
    try {
      let res = await getLoggedUserCart();
      if (res.status === "success") {
        settotal(res.data.totalCartPrice);
        setCartId(res.cartId);
        setProducts(res.data.products);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeItem(id: string) {
    setRemoveDisable(true);
    setLoadingUpdateId(id);
    try {
      let res = await removeItemFromCart(id);
      if (res.status === "success") {
        setProducts(res.data.products);

        let sum = 0;
        res.data.products.forEach((product: CartProductType) => {
          sum += product.count;
        });
        setNumberOfCartItem(sum);
        getuserCart();

        toast.success("Item removed successfully", {
          duration: 3000,
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          duration: 3000,
          position: "top-center",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error", { duration: 3000, position: "top-center" });
    } finally {
      setLoadingUpdateId(null);
      setRemoveDisable(false);
    }
  }

  async function updateQty(id: string, count: number, sign: string) {
    setUpdateDisable(true);
    setLoadingUpdateId(id);
    try {
      let res = await updateCartQuantity(id, count);
      if (res.status === "success") {
        setProducts(res.data.products);

        toast.success("Quantity updated", {
          duration: 2000,
          position: "top-center",
        });

        if (sign === "+") {
          setNumberOfCartItem(numberOfCartItem + 1);
        } else if (sign === "-") {
          setNumberOfCartItem(numberOfCartItem - 1);
        }
        getuserCart();
      } else {
        toast.error("Failed to update quantity", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error", { duration: 2000, position: "top-center" });
    } finally {
      setLoadingUpdateId(null);
      setUpdateDisable(false);
    }
  }

  useEffect(() => {
    getuserCart();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  async function clear() {
    setProducts([]);

    try {
      let res = await clearCart();

      if (res.status === "success") {
        setNumberOfCartItem(0);
        toast.success(res.message, {
          duration: 3000,
          position: "top-center",
        });
      } else {
        toast.error(res.message, {
          duration: 3000,
          position: "top-center",
        });
        getuserCart();
      }
    } catch (err) {
      toast.error("Network error", { duration: 3000, position: "top-center" });
      getuserCart();
    }
  }

  return (
    <>
      {products?.length > 0 ? (
        <div className="w-2/3 mx-auto my-12">
                              
          {/* clear button */}
          <div className="flex justify-end">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded my-4 cursor-pointer"
              onClick={() => clear()}
            >
              Clear Cart
            </Button>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-emerald-700 text-center">
              Total Cart Price:{total}
            </h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: CartProductType) => {
                  const pid = product.product._id;
                  const isThisLoading = loadingUpdateId === pid;

                  return (



                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={product.product.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            disabled={updateDisable || isThisLoading}
                            onClick={() =>
                              updateQty(pid, product.count - 1, "-")
                            }
                            className="disabled:cursor-not-allowed px-2 py-1 border rounded-full text-lg font-bold disabled:opacity-50"
                          >
                            -
                          </button>

                          <div className="w-8 flex justify-center items-center">
                            {isThisLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                            ) : (
                              <span>{product.count}</span>
                            )}
                          </div>

                          <button
                            disabled={updateDisable || isThisLoading}
                            onClick={() =>
                              updateQty(pid, product.count + 1, "+")
                            }
                            className="disabled:cursor-not-allowed px-2 py-1 border rounded-full text-lg font-bold disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price * product.count} EGP
                      </td>
                      <td className="px-6 py-4">
                        <button
                          disabled={removeDisable || isThisLoading}
                          onClick={() => removeItem(pid)}
                          className="text-red-500 disabled:cursor-not-allowed disabled:text-red-300 font-semibold cursor-pointer flex items-center gap-2"
                        >
                          {isThisLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                          ) : (
                            "Remove"
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Link
              href={`/checkout/${cartId}`}
              className="flex justify-center items-center my-4"
            >
              {/* <Button className="bg-emerald-600 hover:bg-emerald-700 w-2/3 text-white py-2 px-4 rounded my-4 cursor-pointer">
                Checkout
              </Button> */}

              <div className="flex justify-center items-center my-4 gap-4">
  <Link href={`/checkout/${cartId}?method=visa`}>
    <Button className="bg-blue-600 hover:bg-blue-700 w-full text-white py-2 px-4 rounded cursor-pointer">
      Pay with Visa
    </Button>
  </Link>

  <Link href={`/checkout/${cartId}?method=cash`}>
    <Button className="bg-emerald-600 hover:bg-emerald-700 w-full text-white py-2 px-4 rounded cursor-pointer">
      Cash on Delivery
    </Button>
  </Link>
</div>

            </Link>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-3xl font-bold my-12 bg-red-500 text-white p-4 rounded">
          No Products In Cart !
        </h1>
      )}
    </>
  );
}
