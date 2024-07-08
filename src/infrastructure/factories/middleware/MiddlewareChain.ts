import type { IMiddleware } from '@src/application/ports/middlewares/IMiddleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * MiddlewareChain class that implements the IMiddleware interface.
 * Used to manage a chain of middlewares.
 */
export class MiddlewareChain implements IMiddleware {
  matcher: string[];
  private middlewares: IMiddleware[];

  /**
   * Constructor that initializes the list of middlewares and generates the matchers.
   * @param {IMiddleware[]} middlewares - List of middlewares to include in the chain.
   */
  constructor(middlewares: IMiddleware[]) {
    this.middlewares = middlewares;
    this.matcher = this.flattenMatchers(this.middlewares);
  }

  /**
   * Flattens the matchers from the middlewares into a single array of strings.
   * @param {IMiddleware[]} middlewares - List of middlewares.
   * @returns {string[]} - Flattened array of matchers.
   */
  private flattenMatchers(middlewares: IMiddleware[]): string[] {
    return middlewares.flatMap((mw) =>
      Array.isArray(mw.matcher) ? mw.matcher : [mw.matcher]
    );
  }

  /**
   * Handles a Next.js request and returns a NextResponse.
   * Iterates through each middleware to check if the request path matches any of its matchers.
   * If a match is found, the middleware is executed.
   * If the middleware results in a redirect, the middleware processing stops.
   * @param {NextRequest} request - The Next.js request to handle.
   * @returns {Promise<NextResponse>} - The Next.js response.
   */
  async handle(request: NextRequest): Promise<NextResponse> {
    let response = NextResponse.next();

    // Iterate through all middlewares
    for (const middleware of this.middlewares) {
      const path = request.nextUrl.pathname;
      const matchers = Array.isArray(middleware.matcher)
        ? middleware.matcher
        : [middleware.matcher];

      // Check if the request path matches any of the middleware's matchers
      const isMatch = matchers.some((matcher) =>
        new RegExp(matcher.replace(':path*', '.*')).test(path)
      );

      // If the path matches, execute the middleware
      if (isMatch) {
        response = await middleware.handle(request);
        // If the response is a redirect, stop processing middlewares
        if (response.redirected) {
          break;
        }
      }
    }

    return response;
  }
}
