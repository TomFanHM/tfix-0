import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://www.tfix-module.com"]
    : ["http://localhost:3000"];

export function middleware(request: NextRequest) {
  //console.log("Here is middleware console log");
  //console.log(request.method);
  //console.log(request.url);

  const origin = request.headers.get("origin");
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: { "Content-Type": "text/plain" },
    });
  }

  const res = NextResponse.next();

  const regx = new RegExp("/api/*");

  if (regx.test(request.url)) {
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
    res.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  }

  return res;
}

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/api/:function*',
};