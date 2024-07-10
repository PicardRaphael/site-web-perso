import type { IMiddleware } from '@src/application/ports/middlewares/IMiddleware';
import { NextResponse } from 'next/server';

export function createMockMiddleware(
  matcher: string | string[]
): jest.Mocked<IMiddleware> {
  return {
    matcher,
    handle: jest.fn().mockResolvedValue(NextResponse.next()),
  } as unknown as jest.Mocked<IMiddleware>;
}
