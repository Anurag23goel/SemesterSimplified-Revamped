import { ApiError, ApiSuccess } from "@/app/api/services/ApiResponse";
import databaseConnection from "@/utils/dbConnection";
import USER from "@/utils/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { newPassword } = await req.json();
  const userEmail = req.cookies.get("userEmail")?.value;

  try {
    await databaseConnection();

    const updatedUser = await USER.findOneAndUpdate(
      { email: userEmail },
      { password: newPassword }
    );

    if (!updatedUser) {
      return ApiError("User not found", 404);
    }

    console.log(updatedUser);

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error while resetting password: ", error.message);
    return ApiError(error.message, 500);
  }
}
