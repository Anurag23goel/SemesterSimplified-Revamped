import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // ✅ Check if token exists
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }


    const response = NextResponse.json(
      { success: true, message: "Logout Successful" },
      { status: 200 }
    );


    response.cookies.delete("token");

    return response;
  } catch (error) {
    console.error("Logout Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
