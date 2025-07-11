import { ApiError, ApiSuccess } from "@/app/api/services/ApiResponse";
import getUserFromToken from "@/app/api/services/getUserFromToken";
import { MESSAGE, MESSAGE_ROOM } from "@/utils/models/messages.model";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { connectionID: string } }
) {
  try {
    const { connectionID } = await params;

    const user = await getUserFromToken(req);

    if (user && !user.success) {
      return ApiError(user.message, 400);
    }

    // LOGIC TO FETCH EXISTING ROOM OR CREATE NEW ROOM
    const existingChatRoom = await MESSAGE_ROOM.findOne({
      participants: {
        $all: [user?.user.id, connectionID],
      },
    });

    if (existingChatRoom) {
      const messages = await MESSAGE.find({ roomId: existingChatRoom._id }).sort({
        createdAt: -1,
      });
      return ApiSuccess("Chat room already exists", { room_already_exists:true, existingChatRoom, messages }, 200);
    } else {
      const newChatRoom = await MESSAGE_ROOM.create({
        participants: [user?.user.id, connectionID],
        room_type:"individual"
      });

      return ApiSuccess("Chat room created successfully", {room_already_exists: false, newChatRoom}, 200);
    }
  } catch (error: any) {
    console.log("Error while getting/creating chat room: ", error.message);
    return ApiError(
      "Interal Server Error while getting/creating chat room",
      500
    );
  }
}
