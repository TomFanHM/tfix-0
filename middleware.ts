import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const res = NextResponse.next();

  const regx = new RegExp("/api/*");

  if (regx.test(request.url)) {
    // Add Cross-Origin-Opener-Policy header to API response
    res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  }

  return NextResponse.next();
}
