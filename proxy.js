import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const userToken = request.cookies.get("user_jwt_token")?.value;
  const adminToken = request.cookies.get("admin_jwt_token")?.value;

  if (pathname === "/login" && userToken) {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  if (pathname === "/admin-login" && adminToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (pathname.startsWith("/user") && !userToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin-login" &&
    !adminToken
  ) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/login", "/admin-login"],
};
