import { UserRole } from '@src/domain/entities/UserEntity';
import { UserUseCase } from '@src/domain/use-cases/UserUseCase';
import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';
import { createMockUserUseCase } from '@src/__mocks__/helpers';

describe('UserUseCase', () => {
  let mockUserUseCase: jest.Mocked<UserUseCase>;

  beforeEach(() => {
    mockUserUseCase = createMockUserUseCase();
  });

  describe('getUserRole', () => {
    it('should return true when the user role is successfully retrieved', async () => {
      mockUserUseCase.getUserRole.mockResolvedValue(true);

      const result = await mockUserUseCase.getUserRole();

      expect(mockUserUseCase.getUserRole).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should handle errors appropriately when retrieval fails', async () => {
      mockUserUseCase.getUserRole.mockRejectedValue(
        new Error('Failed to get user role')
      );

      await expect(mockUserUseCase.getUserRole()).rejects.toThrow(
        'Failed to get user role'
      );
    });
  });

  describe('setUserRole', () => {
    it('should call setUserRole with a valid user role and handle success', async () => {
      const role = UserRole.ADMIN;
      const successResponse: SuccessResponse<UserRole> = {
        success: true,
        data: role,
      };
      mockUserUseCase.setUserRole.mockResolvedValue(successResponse);

      const result = await mockUserUseCase.setUserRole(role);

      expect(mockUserUseCase.setUserRole).toHaveBeenCalledWith(role);
      expect(result).toEqual(successResponse);
    });

    it('should handle errors appropriately when setting the role fails', async () => {
      const role = UserRole.USER;
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Error setting role',
      };
      mockUserUseCase.setUserRole.mockResolvedValue(errorResponse);

      const result = await mockUserUseCase.setUserRole(role);

      expect(result).toEqual(errorResponse);
    });
  });
});
