import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // ✅ Works in Edge runtime

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  // FIRST FETCH TOKEN
  const token = request.cookies.get("token")?.value;

  try {
    // TOKEN VALIDATION
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // DECODE THE TOKEN USING JWT
    const { payload } = await jwtVerify(token, SECRET_KEY);

    // SET AND SEND THE USER DATA IN HEADERS TO NEXT CONTROLLER FOR API ROUTES AND CONTROLLERS
    const newHeaderWithUserData = new Headers(request.headers);
    newHeaderWithUserData.set("user-data", JSON.stringify(payload));

    // DEFINE FRONTEND ADMIN ROUTES SO THAT MIDDLEWARE IS APPLICABLE TO FRONTEND ROUTES
    const adminOnlyRoutes = ["/admin"];
    if (
      adminOnlyRoutes.includes(request.nextUrl.pathname) &&
      payload.role !== "Administrator"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // SEND THE NEW HEADER WHICH STORES USER DATA FORWARD
    return NextResponse.next({
      request: {
        headers: newHeaderWithUserData,
      },
    });
  } catch (error: any) {
    console.log("Error in middleware: ", error.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/api/users/getUserData", "/admin"],
};
