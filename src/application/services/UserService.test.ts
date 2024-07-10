import { UserService } from '@src/application/services/UserService';
import { IUserRepository } from '@src/domain/repositories/IUserRepository';
import { UserRole } from '@src/domain/entities/UserEntity';
import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';
import { createMockUserRepository } from '@src/__mocks__/helpers';

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = createMockUserRepository();
    userService = new UserService(mockUserRepository);
  });

  describe('getUserRole', () => {
    it('should call getRoleFromCookie on the repository', async () => {
      mockUserRepository.getRoleFromCookie.mockResolvedValue(true);
      const result = await userService.getUserRole();
      expect(mockUserRepository.getRoleFromCookie).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should handle errors from getRoleFromCookie', async () => {
      mockUserRepository.getRoleFromCookie.mockResolvedValue(false);
      const result = await userService.getUserRole();
      expect(mockUserRepository.getRoleFromCookie).toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });

  describe('setUserRole', () => {
    it('should call setRoleInCookie on the repository with the provided role and handle success', async () => {
      const role = UserRole.ADMIN;
      const successResponse: SuccessResponse<UserRole> = {
        success: true,
        data: role,
      };
      mockUserRepository.setRoleInCookie.mockResolvedValue(successResponse);
      const result = await userService.setUserRole(role);
      expect(mockUserRepository.setRoleInCookie).toHaveBeenCalledWith(role);
      expect(result).toEqual(successResponse);
    });

    it('should handle errors from the repository', async () => {
      const role = UserRole.USER;
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Error setting role',
      };
      mockUserRepository.setRoleInCookie.mockResolvedValue(errorResponse);
      const result = await userService.setUserRole(role);
      expect(result).toEqual(errorResponse);
    });

    it('should handle all UserRole values correctly', async () => {
      const roles = Object.values(UserRole);
      for (const role of roles) {
        const successResponse: SuccessResponse<UserRole> = {
          success: true,
          data: role,
        };
        mockUserRepository.setRoleInCookie.mockResolvedValue(successResponse);
        const result = await userService.setUserRole(role);
        expect(mockUserRepository.setRoleInCookie).toHaveBeenCalledWith(role);
        if (result.success) {
          expect(result.data).toBe(role);
        } else {
          fail(`Expected a success response for role ${role}`);
        }
      }
    });
  });
});
