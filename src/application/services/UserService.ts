import { UserRole } from '@src/domain/entities/UserEntity';
import { IUserRepository } from '@src/domain/repositories/IUserRepository';
import { UserUseCase } from '@src/domain/use-cases/UserUseCase';
import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';

/**
 * Service class that implements the UserUseCase interface.
 * Used to handle user-related operations.
 *
 * @class UserService
 * @implements {UserUseCase}
 */
export class UserService implements UserUseCase {
  /**
   * Creates an instance of UserService.
   *
   * @param {IUserRepository} userRepository - The user repository instance to be used by the service.
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Gets the user role from the cookies.
   *
   * @returns {Promise<Boolean>} - A promise that resolves to a boolean indicating the user role status.
   */
  async getUserRole(): Promise<Boolean> {
    return this.userRepository.getRoleFromCookie();
  }

  /**
   * Sets the user role in the cookies.
   *
   * @param {UserRole} role - The role to set in the cookies.
   * @returns {Promise<SuccessResponse<UserRole> | ErrorResponse>} - A promise that resolves to a success response containing the user role or an error response.
   */
  async setUserRole(
    role: UserRole
  ): Promise<SuccessResponse<UserRole> | ErrorResponse> {
    return this.userRepository.setRoleInCookie(role);
  }
}
