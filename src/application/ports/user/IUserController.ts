import { UserRole } from '@src/domain/entities/UserEntity';
import { SuccessResponse } from '@src/utils/error/ErrorHanlder';

/**
 * IUserController interface defining the methods for user controller.
 */
export interface IUserController {
  setUserRole(role: UserRole): Promise<SuccessResponse<UserRole>>;
  getUserRole(): Promise<Boolean>;
}
