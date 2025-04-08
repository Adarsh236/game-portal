import { commonMiddleware } from '@game-portal/shared/helpers/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Middleware that enforces market routing and user-specific restrictions.
 */
export function middleware(request: NextRequest): NextResponse {
  return commonMiddleware(request);
}
