import { UserController } from '@src/interface/controllers/UserController';
import { UserUseCase } from '@src/domain/use-cases/UserUseCase';
import { UserRole } from '@src/domain/entities/UserEntity';
import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';
import { createMockUserUseCase } from '@src/__mocks__/helpers';

jest.mock('@src/domain/use-cases/UserUseCase');

describe('UserController', () => {
  let userController: UserController;
  let mockUserUseCase: jest.Mocked<UserUseCase>;

  beforeEach(() => {
    mockUserUseCase = createMockUserUseCase();
    userController = new UserController(mockUserUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserRole', () => {
    it('should call getUserRole on the use case', async () => {
      mockUserUseCase.getUserRole.mockResolvedValue(true);
      const result = await userController.getUserRole();
      expect(mockUserUseCase.getUserRole).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('setUserRole', () => {
    it('should call setUserRole on the use case with the provided role and handle success', async () => {
      const role = UserRole.ADMIN;
      const successResponse: SuccessResponse<UserRole> = {
        success: true,
        data: role,
      };
      mockUserUseCase.setUserRole.mockResolvedValue(successResponse);
      const result = await userController.setUserRole(role);
      expect(mockUserUseCase.setUserRole).toHaveBeenCalledWith(role);
      expect(result).toEqual(successResponse);
    });

    it('should handle errors from the use case', async () => {
      const role = UserRole.USER;
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Error setting role',
      };
      mockUserUseCase.setUserRole.mockResolvedValue(errorResponse);
      const result = await userController.setUserRole(role);
      expect(result).toEqual(errorResponse);
    });
  });
});
