import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';
import { UserRole } from '../entities/UserEntity';

export interface IUserRepository {
  setRoleInCookie(
    role: UserRole
  ): Promise<SuccessResponse<UserRole> | ErrorResponse>;
  getRoleFromCookie(): Promise<Boolean>;
}
