import { ApiError, ApiSuccess } from "@/app/api/services/ApiResponse";
import getUserFromToken from "@/app/api/services/getUserFromToken";
import { MESSAGE } from "@/utils/models/messages.model";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { roomID: string } }
) {
  try {
    const { roomID } = params;
    console.log(roomID);

    if (!roomID) {
      return ApiError("Room ID is required", 400);
    }

    const user = await getUserFromToken(req);

    if (user && !user.success) {
      return ApiError(user.message, 400);
    }

    //LOGIC TO FETCH ALL MESSAGES RELATED TO ROOM
    const messages = await MESSAGE.find({ roomId: roomID }).sort({
      createdAt: -1,
    });

    return ApiSuccess("Messages fetched successfully", messages, 200);
  } catch (error: any) {
    console.log(
      "Internal server error while fetching messages for particular chat",
      error.message
    );
    return ApiError(error.message, 500);
  }
}
