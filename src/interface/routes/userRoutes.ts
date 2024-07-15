import { UserRole } from '@src/domain/entities/UserEntity';
import { SuccessResponse } from '@src/utils/error/ErrorHanlder';

/**
 * Sets the user role by sending a POST request to the '/api/auth' endpoint.
 * @param {UserRole} role - The role to be set for the user.
 * @returns {Promise<SuccessResponse<UserRole>>} - A promise that resolves to a success response containing the user role.
 * @throws {Error} - Throws an error if the request fails.
 */
export const setUserRole = async (
  role: UserRole
): Promise<SuccessResponse<UserRole>> => {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    throw new Error('Failed to set user role');
  }

  const data = await response.json();
  return data;
};
