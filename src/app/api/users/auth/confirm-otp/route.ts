import { ApiError } from "@/app/api/services/ApiResponse";
import databaseConnection from "@/utils/dbConnection";
import USER from "@/utils/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { otp } = await req.json();
  const userEmail = req.cookies.get("userEmail")?.value;

  try {
    await databaseConnection();

    const user = await USER.findOne({ email: userEmail }).select("+forgotPasswordOTP");

    if (!user) {
      return ApiError("User not found", 404);
    }

    if (user.forgotPasswordOTP !== otp) {
      return ApiError("Invalid OTP", 400);
    }

    // Clear OTP after verification
    user.forgotPasswordOTP = undefined;
    await user.save();

    // ✅ Return success response with redirect URL
    return NextResponse.json(
      {
        success:true,
        message: "OTP verified successfully",
        redirectUrl: "/reset-password", // ✅ Redirect user here
      },
      { status: 200 }
    );
  } catch (error:any) {
    return ApiError(error.message, 500);
  }
}
