import { ALLOWED_MARKETS, ALLOWED_PATHS } from '@game-portal/constants/brands';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Middleware that enforces market routing and user-specific restrictions.
 */
export function commonMiddleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Bypass middleware for internal assets and API routes.
  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  const segments = getPathSegments(pathname);

  // Validate market: the first segment should be an allowed market.
  const market = segments[0];
  if (!market || !ALLOWED_MARKETS.includes(market)) {
    return redirectToPath(request, '/en');
  }

  // Retrieve the user's market from cookies.
  const userMarket = request.cookies.get('userMarket')?.value;

  // Enforce correct market if the logged-in user’s market differs from the URL market.
  if (userMarket && userMarket !== market) {
    // Replace the market segment in the URL with the user's market.
    const newPath = pathname.replace(/^\/(en|ca)/, `/${userMarket}`);
    return redirectToPath(request, newPath);
  }

  // Enforce correct market if the logged-in user’s market differs from the URL market.
  const scenario1 =
    userMarket &&
    userMarket === market &&
    pathname.startsWith(`/${market}/login`);

  // If no user is logged in and they try to access the profile page, redirect to the casino lobby.
  const scenario2 = !userMarket && segments[1] === 'my-profile';

  // Validate that the page (second segment) is allowed.
  const scenario3 = !ALLOWED_PATHS.includes(segments[1] || '');

  if (scenario1 || scenario2 || scenario3) {
    return redirectToPath(request, `/${market}/casino`);
  }

  return NextResponse.next();
}

/**
 * Redirects the request to the provided path.
 * Creates a new URL based on the request's URL, sets the new pathname,
 * and clears any query parameters.
 */
function redirectToPath(request: NextRequest, newPath: string): NextResponse {
  const url = updatePath(request, newPath);

  return NextResponse.redirect(url);
}

/**
 * Determines if a request should bypass middleware.
 * Bypasses Next.js internal routes, assets, and API routes.
 */
export function shouldBypass(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  );
}

/**
 * Splits the URL pathname into non-empty segments.
 */
export function getPathSegments(pathname: string): string[] {
  return pathname.split('/').filter(Boolean);
}

/**
 * Return next url
 * Creates a new URL based on the request's URL, sets the new pathname,
 * and clears any query parameters.
 */
export function updatePath(request: NextRequest, newPath: string): NextURL {
  const url = request.nextUrl.clone();
  url.pathname = newPath;
  url.search = '';
  return url;
}
