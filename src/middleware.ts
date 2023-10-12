import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const auth = req.nextUrl.clone();
  auth.pathname = "/sign-up";
  const afterAuth = req.nextUrl.clone();
  afterAuth.pathname = "/dashboard";

  if (req.nextUrl.pathname === "/dashboard") {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect(auth);
    // If user is authenticated, continue.
  }

  if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/sign-up") {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (session) return NextResponse.redirect(afterAuth);
    // If user is authenticated, continue.
  }
}
