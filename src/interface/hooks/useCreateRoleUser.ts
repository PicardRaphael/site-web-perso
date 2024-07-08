import { UserRole } from '@src/constants/userRoles';
import { setUserRole } from '@src/infrastructure/api/setUserRole';
import { ErrorHandler, Response } from '@src/utils/error/ErrorHanlder';
import { ToastHandler } from '@src/utils/error/ToastHandler';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

export function useCreateRoleUser(): UseMutationResult<
  Response<UserRole>,
  Error,
  UserRole
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setUserRole,
    onSuccess: async () => {
      ToastHandler.success('User role created successfully 🎉');
      return await queryClient.invalidateQueries({ queryKey: ['role'] });
    },
    onError: (error: any) => {
      const errorResponse = ErrorHandler.handleApiError(error);
      ToastHandler.handleApiError(errorResponse.error);
    },
  });
}
