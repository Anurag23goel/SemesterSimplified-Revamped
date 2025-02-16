import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  try {
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (!payload || !payload.id) {
      return NextResponse.json(
        { success: false, message: "Invalid Token Payload" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, userID: payload.id });
  } catch (error: any) {
    console.error("JWT Verification Error:", error);
    return NextResponse.json(
      { success: false, message: "Invalid Token" },
      { status: 403 }
    );
  }
}
