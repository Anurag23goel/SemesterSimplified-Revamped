import databaseConnection from "@/utils/dbConnection";
import UNIVERSITY from "@/utils/models/university.model";
import { NextRequest } from "next/server";
import { ApiSuccess, ApiError } from "../../services/ApiResponse";

export async function GET(request: NextRequest) {
  try {
    await databaseConnection();

    const universities = await UNIVERSITY.find();

    return ApiSuccess("Universities fetched successfully", universities, 200);
  } catch (error) {
    return ApiError(error, 500);
  }
}
