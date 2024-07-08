import { MiddlewareChain } from '@src/infrastructure/factories/middleware/MiddlewareChain';
import { MiddlewareFactory } from '@src/infrastructure/factories/middleware/MiddlewareFactory';
import type { NextRequest } from 'next/server';

// Create an instance of the factory
const middlewareFactory = new MiddlewareFactory();

// Use the factory to create the authentication middleware
const authMiddleware = middlewareFactory.createAuthMiddleware();

// Add other middlewares here if necessary
const middlewares = [authMiddleware];

// Create a middleware chain
const middlewareChain = new MiddlewareChain(middlewares);

/**
 * Middleware function to handle Next.js requests.
 * Uses a chain of middlewares to process the request.
 * @param {NextRequest} request - The Next.js request to handle.
 * @returns {Promise<NextResponse>} - The Next.js response.
 */
export async function middleware(request: NextRequest) {
  return middlewareChain.handle(request);
}

export const config = {
  matcher: middlewareChain.matcher,
};
