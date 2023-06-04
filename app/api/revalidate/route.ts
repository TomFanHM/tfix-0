import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const secret = request.nextUrl.searchParams.get("secret");
  //prevent unauthorized access
  if (secret !== process.env.NEXT_PUBLIC_APP_REVALIDATION_SECRET)
    return NextResponse.json({ revalidated: false, now: Date.now() });
  //find path
  if (!path) return NextResponse.json({ revalidated: false, now: Date.now() });
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
