import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';
import { UserRole } from '../entities/UserEntity';

export interface UserUseCase {
  getUserRole(): Promise<Boolean>;
  setUserRole(
    role: UserRole
  ): Promise<SuccessResponse<UserRole> | ErrorResponse>;
}
