import { UserRole } from '@src/domain/entities/UserEntity';
import { UserUseCase } from '@src/domain/use-cases/UserUseCase';
import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';

/**
 * UserController class that handles user-related operations.
 */
export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  /**
   * Gets the user's role.
   * @returns {Promise<Boolean>} - A promise resolved with the user's role.
   */
  async getUserRole(): Promise<Boolean> {
    return this.userUseCase.getUserRole();
  }

  /**
   * Sets the user's role.
   * @param {UserRole} role - The role to assign to the user.
   * @returns {Promise<SuccessResponse<UserRole> | ErrorResponse>} - A promise resolved with the success or error of the operation.
   */
  async setUserRole(
    role: UserRole
  ): Promise<SuccessResponse<UserRole> | ErrorResponse> {
    const user = await this.userUseCase.setUserRole(role);
    return user;
  }
}
