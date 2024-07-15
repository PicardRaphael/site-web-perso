import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';
import { UserRole } from '../entities/UserEntity';

/**
 * IUserRepository interface defining the methods for user repository.
 * @interface
 */
export interface IUserRepository {
  /**
   * Sets the user role in a cookie.
   * @param {UserRole} role - The role to be set in the cookie.
   * @returns {Promise<SuccessResponse<UserRole> | ErrorResponse>} - A promise that resolves to either a success or error response.
   */
  setRoleInCookie(
    role: UserRole
  ): Promise<SuccessResponse<UserRole> | ErrorResponse>;

  /**
   * Retrieves the user role from a cookie.
   * @returns {Promise<Boolean>} - A promise that resolves to a boolean indicating if the role was successfully retrieved.
   */
  getRoleFromCookie(): Promise<Boolean>;
}
