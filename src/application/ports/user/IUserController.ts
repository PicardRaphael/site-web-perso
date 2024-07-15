import { UserRole } from '@src/domain/entities/UserEntity';
import { SuccessResponse } from '@src/utils/error/ErrorHanlder';

/**
 * IUserController interface defining the methods for user controller.
 *
 * @interface IUserController
 */
export interface IUserController {
  /**
   * Sets the user role.
   *
   * @param {UserRole} role - The role to set for the user.
   * @returns {Promise<SuccessResponse<UserRole>>} - A promise that resolves to a success response containing the user role.
   */
  setUserRole(role: UserRole): Promise<SuccessResponse<UserRole>>;

  /**
   * Gets the user role.
   *
   * @returns {Promise<Boolean>} - A promise that resolves to a boolean indicating if the user role was retrieved successfully.
   */
  getUserRole(): Promise<Boolean>;
}
