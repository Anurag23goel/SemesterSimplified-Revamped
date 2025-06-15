import { NextRequest } from "next/server";
import getUserFromToken from "../../services/getUserFromToken";
import USER from "@/utils/models/user.model";
import { ApiError, ApiSuccess } from "../../services/ApiResponse";

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);

    if (user && !user.success) {
      return ApiError(user.message, 400);
    }

    // SEND AL USERS EXCEPT THE USER WHO IS LOGGED IN
    const allUsers = await USER.find({ _id: { $ne: user?.user._id } });

    return ApiSuccess("Users fetched successfully", allUsers, 200);
  } catch (error: any) {
    console.log(
      "Internal server error while fetching all users",
      error.message
    );
    return ApiError(error.message, 500);
  }
}
