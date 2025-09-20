"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContext";
import { Heart } from "lucide-react";
import { jwtDecode } from "jwt-decode"; 
type DecodedToken = {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
};

export default function Navbar() {
  const { numberOfCartItem } = useContext(CartContext);
  const { data: session, status } = useSession();

  let userId: string | undefined;
  try {
    if (session?.token ) {
      const decodedToken: DecodedToken = jwtDecode(session.token);
      userId = decodedToken.id;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <nav className="bg-emerald-600 text-white">
      <div className="container w-[80%] mx-auto p-4 flex flex-col gap-4 lg:flex-row justify-between items-center">
        {/* Left section */}
        <div className="left">
          <ul className="flex gap-2 lg:gap-6 items-center">
            <li className="flex items-center gap-2 text-2xl font-bold">
              <Link href="/">
                <i className="fa-solid fa-cart-shopping"></i> FreshCart
              </Link>
            </li>

            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/brands">Brands</Link>
            </li>
            {session && (
              <>
                <li className="relative">
                  <Link href="/cart" className="relative">
                    <i className="fas fa-shopping-cart"></i>
                    {numberOfCartItem > 0 && (
                      <span className="absolute -top-2 -right-3 w-5 h-5 bg-red-600 rounded-full flex justify-center items-center text-xs">
                        {numberOfCartItem}
                      </span>
                    )}
                  </Link>
                </li>

                <li className="relative">
                  <Link href="/wishlist" className="relative">
                    <Heart className="w-6 h-6 text-gray-200 hover:text-red-500 transition" />
                  </Link>
                </li>
              </>
            )}
            {status === "authenticated" && userId ? (
              <li>
                <Link
                  href={`/orders/user/${userId}`}
                  className="hover:text-gray-300 transition-colors"
                >
                  My Orders
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="hover:text-gray-300 transition-colors"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Right section */}
        <div className="right">
          <ul className="flex gap-4 items-center">
            {!session ? (
              <>
                <li>
                  <i className="fab fa-facebook"></i>
                </li>
                <li>
                  <i className="fab fa-instagram"></i>
                </li>
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
                <li>
                  <i className="fab fa-youtube"></i>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <span className="cursor-pointer" onClick={logout}>
                    Signout
                  </span>
                </li>
                {session && <li>Hi {session.user?.name} 💕</li>}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
