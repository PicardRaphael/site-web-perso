import type { IMiddleware } from '@src/application/ports/middlewares/IMiddleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export class MiddlewareChain implements IMiddleware {
  matcher: string[];
  private middlewares: IMiddleware[];

  constructor(middlewares: IMiddleware[]) {
    this.middlewares = middlewares;
    this.matcher = this.flattenMatchers(this.middlewares);
  }

  private flattenMatchers(middlewares: IMiddleware[]): string[] {
    return middlewares.flatMap((mw) =>
      Array.isArray(mw.matcher) ? mw.matcher : [mw.matcher]
    );
  }

  async handle(request: NextRequest): Promise<NextResponse> {
    let response = NextResponse.next();

    for (const middleware of this.middlewares) {
      const path = request.nextUrl.pathname;
      const matchers = Array.isArray(middleware.matcher)
        ? middleware.matcher
        : [middleware.matcher];
      const isMatch = matchers.some((matcher) =>
        new RegExp(matcher.replace(':path*', '.*')).test(path)
      );

      if (isMatch) {
        response = await middleware.handle(request);
        if (response.redirected) {
          break;
        }
      }
    }

    return response;
  }
}
