import { UserRepository } from '@src/infrastructure/adapters/user/UserRepository';
import { UserRole } from '@src/domain/entities/UserEntity';
import { SuccessResponse } from '@src/utils/error/ErrorHanlder';
import { createMockCookies } from '@src/__mocks__/helpers/createMockCookies';

// Déplacez l'import ici pour éviter l'erreur d'initialisation
const mockCookies = createMockCookies();

// Mock the `cookies` module
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => mockCookies) as unknown,
}));

describe('UserRepository', () => {
  let userRepository: UserRepository;

  // Simulate the createRequestAsyncStorage function
  const createRequestAsyncStorage = (callback: Function) => {
    return callback();
  };

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  describe('getRoleFromCookie', () => {
    it('should return true if the token is "admin"', async () => {
      mockCookies.get.mockReturnValue({ name: 'auth_token', value: 'admin' });

      const result = await createRequestAsyncStorage(() => {
        return userRepository.getRoleFromCookie();
      });

      expect(result).toBe(true);
      expect(mockCookies.get).toHaveBeenCalledWith('auth_token');
    });

    it('should return false if the token is not "admin"', async () => {
      mockCookies.get.mockReturnValue({ name: 'auth_token', value: 'user' });

      const result = await createRequestAsyncStorage(() => {
        return userRepository.getRoleFromCookie();
      });

      expect(result).toBe(false);
      expect(mockCookies.get).toHaveBeenCalledWith('auth_token');
    });

    it('should return false if the token is not present', async () => {
      mockCookies.get.mockReturnValue(undefined);

      const result = await createRequestAsyncStorage(() => {
        return userRepository.getRoleFromCookie();
      });

      expect(result).toBe(false);
      expect(mockCookies.get).toHaveBeenCalledWith('auth_token');
    });
  });

  describe('setRoleInCookie', () => {
    it('should set the auth_token cookie with the correct role and return success response', async () => {
      const role = UserRole.ADMIN;
      const expectedResponse: SuccessResponse<UserRole> = {
        success: true,
        data: role,
      };

      const result = await createRequestAsyncStorage(() => {
        return userRepository.setRoleInCookie(role);
      });

      expect(mockCookies.set).toHaveBeenCalledWith('auth_token', role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      });
      expect(result).toEqual(expectedResponse);
    });
  });
});
