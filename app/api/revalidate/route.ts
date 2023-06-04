import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const secret = request.nextUrl.searchParams.get("secret");
  try {
    //prevent unauthorized access
    if (secret !== process.env.NEXT_PUBLIC_APP_REVALIDATION_SECRET)
      throw new Error("Unauthorized");
    //find path
    if (!path) throw new Error("Path not found");

    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now(), error: "" });
  } catch (error) {
    return NextResponse.json({
      revalidated: false,
      now: Date.now(),
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
