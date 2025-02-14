import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // FIRST FETCH TOKEN
  const token = request.cookies.get("token")?.value;

  try {
    // TOKEN VALIDATION
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // DECODE THE TOKEN USING JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    // SET AND SEND THE USER DATA IN HEADERS TO NEXT CONTROLLER FOR API ROUTES AND CONTROLLERS
    const newHeaderWithUserData = new Headers(request.headers);
    newHeaderWithUserData.set("user-data", JSON.stringify(decodedToken));

    // DEFINE FRONTEND ADMIN ROUTES SO THAT MIDDLEWARE IS APPLICABLE TO FRONTEND ROUTES
    const adminOnlyRoutes = ["/admin"];
    if (
      adminOnlyRoutes.includes(request.nextUrl.pathname) &&
      decodedToken.role !== "Administrator"
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
  matcher: [],
};
