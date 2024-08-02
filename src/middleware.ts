import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request as any,
    secret: process.env.AUTH_SECRET,
  });

  // Allow access to login, register, logo, and api routes
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/api/auth") ||
    request.nextUrl.pathname === "/htc-new-seal.png"
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  // if (
  //   request.nextUrl.pathname.startsWith("/register") &&
  //   token.role !== "admin"
  // ) {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url)); // Redirect to an unauthorized page
  // }

  // if (
  //   (request.nextUrl.pathname.startsWith("/staff-dashboard") ||
  //     request.nextUrl.pathname.startsWith("/staff-approve") ||
  //     request.nextUrl.pathname.startsWith("/staff-requirements")) &&
  //   token.role !== "staff"
  // ) {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url)); // Redirect to an unauthorized page
  // }
  // if (
  //   (request.nextUrl.pathname.startsWith("/signatory-dashboard") ||
  //     request.nextUrl.pathname.startsWith("/signatory-sign")) &&
  //   token.role !== "signatory"
  // ) {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url)); // Redirect to an unauthorized page
  // }
  // if (
  //   (request.nextUrl.pathname.startsWith("/student-dashboard") ||
  //     request.nextUrl.pathname.startsWith("/student-clearance") ||
  //     request.nextUrl.pathname.startsWith("/student-requirements") ||
  //     request.nextUrl.pathname.startsWith(
  //       "/student-clearance/track-clearance"
  //     )) &&
  //   token.role !== "student"
  // ) {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url)); // Redirect to an unauthorized page
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - static files
     * - API routes
     * - login page
     * - logo file
     * - any other public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|login|htc-new-seal.png|unauthorized|api).*)",
  ],
};
