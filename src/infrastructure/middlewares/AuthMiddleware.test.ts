import { AuthMiddleware } from '@src/infrastructure/middlewares/AuthMiddleware';
import { rootContainer } from '@src/dependencyInjection/RootContainer';
import { NextRequest } from 'next/server';

// Mock the rootContainer et d'autres dépendances
jest.mock('@src/dependencyInjection/RootContainer', () => {
  const helpers = require('@src/__mocks__/helpers');
  return {
    rootContainer: helpers.createMockRootContainer(),
  };
});

describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware;
  let mockRequest: Partial<NextRequest>;

  beforeEach(() => {
    authMiddleware = new AuthMiddleware();

    mockRequest = {
      nextUrl: { pathname: '' } as any,
      url: 'http://localhost',
    };
  });

  it('should allow access to dashboard routes if the user is an admin', async () => {
    const userController = rootContainer.getUserContainer().getUserController();
    (userController.getUserRole as jest.Mock).mockResolvedValue(true);

    mockRequest.nextUrl!.pathname = '/dashboard';
    const response = await authMiddleware.handle(mockRequest as NextRequest);

    expect(response).toBe('NextResponse.next');
  });

  it('should redirect to the home page if the user is not an admin', async () => {
    const userController = rootContainer.getUserContainer().getUserController();
    (userController.getUserRole as jest.Mock).mockResolvedValue(false);

    mockRequest.nextUrl!.pathname = '/dashboard';
    const response = await authMiddleware.handle(mockRequest as NextRequest);

    expect(response).toBe('NextResponse.redirect to http://localhost/');
  });

  it('should allow access to non-dashboard routes regardless of the user role', async () => {
    const userController = rootContainer.getUserContainer().getUserController();
    (userController.getUserRole as jest.Mock).mockResolvedValue(false);

    mockRequest.nextUrl!.pathname = '/home';
    const response = await authMiddleware.handle(mockRequest as NextRequest);

    expect(response).toBe('NextResponse.next');
  });
});
