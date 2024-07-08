import { NextRequest, NextResponse } from 'next/server';

/**
 * IMiddleware interface.
 * Defines the contract for middlewares.
 */
export interface IMiddleware {
  matcher: string | string[];
  /**
   * Handles a Next.js request and returns a NextResponse.
   * @param {NextRequest} request - The Next.js request to handle.
   * @returns {NextResponse | Promise<NextResponse>} - The Next.js response.
   */
  handle(request: NextRequest): NextResponse | Promise<NextResponse>;
}
