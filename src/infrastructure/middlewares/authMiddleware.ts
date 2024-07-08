import type { NextRequest } from 'next/server';
import { MiddlewareFactory } from '../factories/middleware/MiddlewareFactory';

const middlewareFactory = new MiddlewareFactory();
const authMiddleware = middlewareFactory.createAuthMiddleware();

export async function middleware(request: NextRequest) {
  return authMiddleware.handle(request);
}

export const config = {
  matcher: '/dashboard/:path*',
};
