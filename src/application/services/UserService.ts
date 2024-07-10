import { UserRole } from '@src/domain/entities/UserEntity';
import { IUserRepository } from '@src/domain/repositories/IUserRepository';
import { UserUseCase } from '@src/domain/use-cases/UserUseCase';
import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';

export class UserService implements UserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async getUserRole(): Promise<Boolean> {
    return this.userRepository.getRoleFromCookie();
  }

  async setUserRole(
    role: UserRole
  ): Promise<SuccessResponse<UserRole> | ErrorResponse> {
    return this.userRepository.setRoleInCookie(role);
  }
}
