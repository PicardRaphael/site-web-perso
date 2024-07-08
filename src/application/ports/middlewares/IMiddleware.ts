import { NextRequest, NextResponse } from 'next/server';

export interface IMiddleware {
  matcher: string | string[];
  handle(request: NextRequest): NextResponse | Promise<NextResponse>;
}
