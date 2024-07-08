import { UserRole } from '@src/constants/userRoles';
import { ErrorHandler, Response } from '@src/utils/error/ErrorHanlder';

/**
 * Sets the user's role by sending a POST request to the '/api/auth' endpoint.
 * @param {UserRole} role - The role to set for the user.
 * @returns {Promise<Response | string>} - Returns the response from the fetch call or an error message.
 */
export const setUserRole = async (
  role: UserRole
): Promise<Response<UserRole>> => {
  const response = await fetch(`/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(role),
  });
  const result = await response.json();
  if (!response.ok) {
    throw ErrorHandler.handleApiError(
      result.error || 'An unexpected error occurred'
    );
  }
  return result;
};
