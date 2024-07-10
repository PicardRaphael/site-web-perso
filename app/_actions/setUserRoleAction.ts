import { rootContainer } from '@src/dependencyInjection/RootContainer';
import { UserRole } from '@src/domain/entities/UserEntity';
import { userRoleSchema } from '@src/domain/schemas/userSchema';
import {
  ErrorHandler,
  ErrorResponse,
  Response,
  SuccessResponse,
} from '@src/utils/error/ErrorHanlder';

/**
 * Sets the user role by validating the role and calling the UserController to perform the action.
 * @param {UserRole} role - The role to set for the user.
 * @returns {Promise<Response<SuccessResponse<UserRole>>>} - The response indicating success or failure.
 */
export async function setUserRoleAction(
  role: UserRole
): Promise<Response<SuccessResponse<UserRole> | ErrorResponse>> {
  try {
    // Validate the user role using Zod schema
    const validatedData = userRoleSchema.parse(role);

    // Get an instance of UserController
    const userController = rootContainer.getUserContainer().getUserController();

    // Call the setUserRoleAction method on the UserController
    const userSetRole = await userController.setUserRole(validatedData);

    // Return a success response
    return ErrorHandler.handleSuccess(userSetRole);
  } catch (error) {
    // Handle and return an API error response
    return ErrorHandler.handleApiError(error);
  }
}
