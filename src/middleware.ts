import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Works in Edge runtime

// Ensure JWT Secret exists
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from environment variables");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function middleware(request: NextRequest) {

  // Extract token from cookies
  const token = request.cookies.get("token")?.value;

  try {
    // If there is no token, allow public routes (like login, register)
    if (!token) {
      return NextResponse.next();
    }

    // Verify Token
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Extract Role from Payload
    const role = payload?.role;

    // Prevent authenticated users from accessing login, register, or forgot-password pages
    const publicAuthRoutes = [
      "/user/login",
      "/user/register",
      "/user/forgot-password",
    ];
    if (publicAuthRoutes.includes(request.nextUrl.pathname)) {
      try {
        await jwtVerify(token, JWT_SECRET); // Verify if token is valid
        return NextResponse.redirect(new URL("/", request.url)); // Only redirect if token is valid
      } catch (err) {
        // Token is invalid, allow access to login/register
      }
    }

    // Protect Admin Routes
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      role !== "Administrator"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error.message);
    return NextResponse.next(); // Allow user to access login page if token is invalid
  }
}

// Apply Middleware to Specific Paths
export const config = {
  matcher: [
    "/user/login",
    "/user/register",
    "/user/forgot-password",
    "/admin/:path*",
  ],
};
