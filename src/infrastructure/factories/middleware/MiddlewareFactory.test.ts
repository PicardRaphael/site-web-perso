import { MiddlewareFactory } from '@src/infrastructure/factories/middleware/MiddlewareFactory';
import { AuthMiddleware } from '@src/infrastructure/middlewares/AuthMiddleware';

// Mock the AuthMiddleware class
jest.mock('@src/infrastructure/middlewares/AuthMiddleware', () => {
  return {
    AuthMiddleware: jest.fn().mockImplementation(() => {
      return {
        matcher: ['/dashboard', '/dashboard/:path*'],
        handle: jest.fn(),
      };
    }),
  };
});

describe('MiddlewareFactory', () => {
  let middlewareFactory: MiddlewareFactory;

  beforeEach(() => {
    middlewareFactory = new MiddlewareFactory();
    jest.clearAllMocks();
  });

  it('should create an instance of AuthMiddleware', () => {
    const authMiddleware = middlewareFactory.createAuthMiddleware();
    expect(authMiddleware).toEqual({
      matcher: ['/dashboard', '/dashboard/:path*'],
      handle: expect.any(Function),
    });
  });

  it('should call the AuthMiddleware constructor once', () => {
    middlewareFactory.createAuthMiddleware();
    expect(AuthMiddleware).toHaveBeenCalledTimes(1);
  });

  it('should return an instance that implements IMiddleware', () => {
    const authMiddleware = middlewareFactory.createAuthMiddleware();
    expect(authMiddleware).toHaveProperty('handle');
    expect(authMiddleware).toHaveProperty('matcher', [
      '/dashboard',
      '/dashboard/:path*',
    ]);
  });
});
