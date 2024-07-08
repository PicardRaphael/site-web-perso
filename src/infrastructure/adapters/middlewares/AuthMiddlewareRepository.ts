import type { IMiddleware } from '@src/application/ports/middlewares/IMiddleware';
import type { NextRequest } from 'next/server';
import { checkIfUserIsAdmin } from '@src/utils/auth/authUtils';
import { NextResponse } from 'next/server';

export class AuthMiddleware implements IMiddleware {
  matcher = ['/dashboard', '/dashboard/:path*'];

  async handle(request: NextRequest): Promise<NextResponse> {
    const path = request.nextUrl.pathname;
    if (path.startsWith('/dashboard')) {
      const isAdmin = checkIfUserIsAdmin(request);
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    return NextResponse.next();
  }
}
