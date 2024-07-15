import { UserRole } from '@src/domain/entities/UserEntity';
import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';

/**
 * IUserService interface defining the methods for user service.
 *
 * @interface IUserService
 */
export interface IUserService {
  /**
   * Sets the user role in cookies.
   *
   * @param {UserRole} role - The role to set in the cookies.
   * @returns {Promise<SuccessResponse<UserRole> | ErrorResponse>} - A promise that resolves to a success response containing the user role or an error response.
   */
  setUserRoleInCookies(
    role: UserRole
  ): Promise<SuccessResponse<UserRole> | ErrorResponse>;

  /**
   * Gets the user role from cookies.
   *
   * @returns {Boolean} - A boolean indicating if the user role was retrieved successfully from the cookies.
   */
  getUserRoleFromCookies(): Boolean;
}
