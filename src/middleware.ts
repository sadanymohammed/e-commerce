import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const authPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-reset-code",
    "/reset-password",
  ];

  if (token) {
    if (authPages.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } else {
    if (pathname === "/cart") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/cart",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-reset-code",
    "/reset-password",
  ],
};
