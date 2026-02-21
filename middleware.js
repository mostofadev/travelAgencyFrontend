import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const userToken = request.cookies.get("user_jwt_token")?.value;
  const adminToken = request.cookies.get("admin_jwt_token")?.value;

  // ================= ALREADY LOGGED IN =================
  if (pathname === "/login" && userToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/admin-login" && adminToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // ================= USER PROTECTED ROUTES =================
  if (
    (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) &&
    !userToken
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ================= ADMIN PROTECTED ROUTES =================
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
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/login",
    "/admin-login",
  ],
};
