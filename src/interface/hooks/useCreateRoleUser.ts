import { UserRole } from '@src/domain/entities/UserEntity';
import { setUserRole } from '@src/interface/routes/userRoutes';
import {
  ErrorHandler,
  Response,
  SuccessResponse,
} from '@src/utils/error/ErrorHanlder';
import { ToastHandler } from '@src/utils/error/ToastHandler';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

/**
 * Hook to create a new user role using a mutation.
 * @returns {UseMutationResult<SuccessResponse<UserRole>, Error, UserRole>} - Mutation result with success or error state.
 */
export function useCreateRoleUser(): UseMutationResult<
  SuccessResponse<UserRole>,
  Error,
  UserRole
> {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * Mutation function to set the user role.
     * @param {UserRole} role - The role to be set for the user.
     * @returns {Promise<SuccessResponse<UserRole>>} - The success response containing the user role.
     */
    mutationFn: setUserRole,
    /**
     * Success callback function to handle successful mutation.
     * Displays a success toast message and invalidates the 'role' query.
     */
    onSuccess: async () => {
      ToastHandler.success('User role created successfully 🎉');
      return await queryClient.invalidateQueries({ queryKey: ['role'] });
    },
    /**
     * Error callback function to handle mutation errors.
     * Processes the error using the ErrorHandler and displays an error toast message.
     * @param {any} error - The error object returned from the mutation.
     */
    onError: (error: any) => {
      const errorResponse = ErrorHandler.handleApiError(error);
      ToastHandler.handleApiError(errorResponse.error);
    },
  });
}
