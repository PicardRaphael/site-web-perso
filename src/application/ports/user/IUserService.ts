import { UserRole } from '@src/domain/entities/UserEntity';
import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';

/**
 * IUserService interface defining the methods for user service.
 */
export interface IUserService {
  setUserRoleInCookies(
    role: UserRole
  ): Promise<SuccessResponse<UserRole> | ErrorResponse>;
  getUserRoleFromCookies(): Boolean;
}
