// src/__tests__/helpers.ts

import { IUserRepository } from '@src/domain/repositories/IUserRepository';
import { UserRole } from '@src/domain/entities/UserEntity';
import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';

export function createMockUserRepository(): jest.Mocked<IUserRepository> {
  return {
    setRoleInCookie: jest.fn().mockResolvedValue({
      success: true,
      data: UserRole.ADMIN,
    } as SuccessResponse<UserRole>),
    getRoleFromCookie: jest.fn().mockResolvedValue(true),
  } as unknown as jest.Mocked<IUserRepository>;
}
