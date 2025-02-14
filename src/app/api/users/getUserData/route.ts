import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // Extract user from headed set using middleware
  const userData = req.headers.get("user-data");
  const user = JSON.parse(userData as string);
}
