import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass Next.js internal routes and assets (e.g. _next/static, favicon.ico)
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Split the path into segments and remove empty parts.
  const segments = pathname.split("/").filter(Boolean);
  console.log("@@ Middleware path:", pathname, segments, request.url, "8889+6");

  // Validate the market.
  const allowedMarkets = ["en", "ca"];
  const market = segments[0];
  if (!market || !allowedMarkets.includes(market)) {
    // If the market is missing or invalid, redirect to default "/en"
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Enforce user market if logged in.
  const userMarket = request.cookies.get("userMarket")?.value;
  console.log("@@ cookies path:", userMarket, market, "8889+6");
  // If a user is logged in (userMarket exists) and the user is trying to access the login route,
  // redirect them away from the login page to a default route (e.g., /[market]/casino).
  if (
    userMarket &&
    userMarket === market &&
    pathname.startsWith(`/${market}/login`)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${market}/casino`;
    return NextResponse.redirect(url);
  }

  // If a user is logged in with a market different from the URL's market, enforce the correct market.
  if (userMarket && userMarket !== market) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = newUrl.pathname.replace(/^\/(en|ca)/, `/${userMarket}`);
    return NextResponse.redirect(newUrl);
  }

  // Validate the "page" part of the URL.
  // Allowed routes after the market segment: welcome (""), "login", "casino", "my-profile"
  const allowedPaths = ["", "login", "casino", "my-profile", "live-casino"];
  const secondSegment = segments[1] || "";
  if (!allowedPaths.includes(secondSegment)) {
    // If the page is not allowed, redirect to the casino lobby page.
    const url = request.nextUrl.clone();
    url.pathname = `/${market}/casino`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
