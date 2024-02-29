import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let cookies = request.cookies.get("token");
  console.log({ cookies });

  if (request.nextUrl.pathname.endsWith("/") && cookies?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
