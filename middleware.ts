import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const regx = new RegExp("/api/*");

  if (regx.test(request.url)) {
    //
  }

  const origin = request.headers.get("orgin");

  return NextResponse.next();
}
