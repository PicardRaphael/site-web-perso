import { MiddlewareChain } from '@src/infrastructure/factories/middleware/MiddlewareChain';
import { NextRequest, NextResponse } from 'next/server';
import { createMockMiddleware } from '@src/__mocks__/helpers';

describe('MiddlewareChain', () => {
  let middlewareChain: MiddlewareChain;
  let mockRequest: Partial<NextRequest>;
  let mockResponse: NextResponse;

  beforeEach(() => {
    mockRequest = {
      nextUrl: { pathname: '/dashboard' } as any,
      url: 'http://localhost/dashboard',
    };
    mockResponse = NextResponse.next();
  });

  it('should initialize with a list of middlewares and generate matchers', () => {
    const mockMiddleware1 = createMockMiddleware(['/dashboard']);
    const mockMiddleware2 = createMockMiddleware(['/profile']);
    middlewareChain = new MiddlewareChain([mockMiddleware1, mockMiddleware2]);

    expect(middlewareChain.matcher).toEqual(['/dashboard', '/profile']);
  });

  it('should handle a request by iterating through middlewares and returning the appropriate response', async () => {
    const mockMiddleware = createMockMiddleware(['/dashboard']);
    jest.spyOn(mockMiddleware, 'handle').mockResolvedValue(mockResponse);
    middlewareChain = new MiddlewareChain([mockMiddleware]);

    const response = await middlewareChain.handle(mockRequest as NextRequest);

    expect(mockMiddleware.handle).toHaveBeenCalledWith(mockRequest);
    expect(response).toBe(mockResponse);
  });

  it('should stop processing middlewares if a redirect is encountered', async () => {
    const mockMiddleware1 = createMockMiddleware(['/dashboard']);
    const mockMiddleware2 = createMockMiddleware(['/dashboard']);
    jest.spyOn(mockMiddleware1, 'handle').mockResolvedValue({
      ...mockResponse,
      redirected: true,
    } as NextResponse);
    jest.spyOn(mockMiddleware2, 'handle').mockResolvedValue(mockResponse);

    middlewareChain = new MiddlewareChain([mockMiddleware1, mockMiddleware2]);

    const response = await middlewareChain.handle(mockRequest as NextRequest);

    expect(mockMiddleware1.handle).toHaveBeenCalledWith(mockRequest);
    expect(mockMiddleware2.handle).not.toHaveBeenCalled();
    expect(response.redirected).toBe(true);
  });

  it('should allow non-matching requests to pass through', async () => {
    const mockMiddleware = createMockMiddleware(['/profile']);
    middlewareChain = new MiddlewareChain([mockMiddleware]);

    const response = await middlewareChain.handle(mockRequest as NextRequest);

    expect(mockMiddleware.handle).not.toHaveBeenCalled();
    expect(response).toBe(mockResponse);
  });
});
