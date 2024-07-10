import { UserRole } from '@src/domain/entities/UserEntity';
import { UserUseCase } from '@src/domain/use-cases/UserUseCase';
import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async getUserRole(): Promise<Boolean> {
    return this.userUseCase.getUserRole();
  }

  async setUserRole(
    role: UserRole
  ): Promise<SuccessResponse<UserRole> | ErrorResponse> {
    const user = await this.userUseCase.setUserRole(role);
    return user;
  }
}
