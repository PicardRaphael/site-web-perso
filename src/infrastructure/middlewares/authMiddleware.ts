import type { IMiddleware } from '@src/application/ports/middlewares/IMiddleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { rootContainer } from '@src/dependencyInjection/RootContainer';

/**
 * AuthMiddleware class that implements the IMiddleware interface.
 * Used to handle authentication checks for specific routes.
 */
export class AuthMiddleware implements IMiddleware {
  matcher: string[];

  constructor() {
    this.matcher = ['/dashboard', '/dashboard/:path*'];
  }

  /**
   * Handles a Next.js request and returns a NextResponse.
   * Checks if the user is an admin for dashboard routes.
   * @param {NextRequest} request - The Next.js request to handle.
   * @returns {Promise<NextResponse>} - The Next.js response.
   */
  async handle(request: NextRequest): Promise<NextResponse> {
    const path = request.nextUrl.pathname;
    const userController = rootContainer.getUserContainer().getUserController();
    const isAdmin = await userController.getUserRole();
    if (path.startsWith('/dashboard') && !isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }
}
