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
    const messages = await MESSAGE.find({ roomId: roomID }).populate(
      "sender",
      "name profilePicture"
    );

    return ApiSuccess("Messages fetched successfully", messages, 200);
  } catch (error: any) {
    return ApiError(error.message, 500);
  }
}
