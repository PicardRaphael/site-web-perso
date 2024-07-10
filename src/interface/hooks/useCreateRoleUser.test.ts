// src/interface/hooks/useCreateRoleUser.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientWrapper } from '@src/__mocks__/QueryClientWrapper';
import { useCreateRoleUser } from './useCreateRoleUser';
import { UserRole } from '@src/domain/entities/UserEntity';
import { setUserRole } from '@src/interface/routes/userRoutes';
import { ToastHandler } from '@src/utils/error/ToastHandler';
import { server } from '@src/__mocks__/server';
import { http, HttpResponse } from 'msw';

jest.mock('@src/interface/routes/userRoutes', () => ({
  setUserRole: jest.fn(),
}));

jest.mock('@src/utils/error/ToastHandler', () => ({
  ToastHandler: {
    success: jest.fn(),
    handleApiError: jest.fn(),
  },
}));

describe('useCreateRoleUser', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call setUserRole and handle success', async () => {
    (setUserRole as jest.Mock).mockResolvedValue({
      success: true,
      data: UserRole.ADMIN,
    });

    const { result } = renderHook(() => useCreateRoleUser(), {
      wrapper: QueryClientWrapper,
    });

    result.current.mutate(UserRole.ADMIN);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(setUserRole).toHaveBeenCalledWith(UserRole.ADMIN);
    expect(ToastHandler.success).toHaveBeenCalledWith(
      'User role created successfully 🎉'
    );
  });

  it('should handle error if no role is provided', async () => {
    (setUserRole as jest.Mock).mockImplementation(() => {
      throw new Error();
    });
    server.use(
      //
      http.post('*/api/auth', () => {
        return HttpResponse.json(
          { success: false, error: 'Role not provided' },
          { status: 400 }
        );
      })
    );

    const { result } = renderHook(() => useCreateRoleUser(), {
      wrapper: QueryClientWrapper,
    });

    // Call mutate without any role
    //@ts-ignore
    result.current.mutate();

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
