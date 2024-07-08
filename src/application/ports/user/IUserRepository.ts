import { UserRole } from '@src/constants/userRoles';
import { SuccessResponse } from '@src/utils/error/ErrorHanlder';

export interface IUserRepository {
  setRoleInCookie(role: UserRole): SuccessResponse<UserRole>;
  getRoleByCookie(): Boolean;
}
