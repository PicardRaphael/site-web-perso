import { setUserRole } from './userRoutes';
import { http, HttpResponse } from 'msw';
import { SuccessResponse, ErrorResponse } from '@src/utils/error/ErrorHanlder';
import { UserRole } from '@src/domain/entities/UserEntity';
import { server } from '@src/__mocks__/server';

describe('setUserRole', () => {
  it('should set user role successfully', async () => {
    const role = UserRole.ADMIN;
    const response = await setUserRole(role);
    expect(response).toEqual({ success: true, data: role });
  });

  it('should return an error if role is not provided', async () => {
    server.use(
      http.post('*/api/auth', () => {
        return HttpResponse.json(
          { success: false, error: 'Role not provided' },
          { status: 400 }
        );
      })
    );

    try {
      await setUserRole(undefined as unknown as UserRole);
    } catch (error: any) {
      expect(error.message).toBe('Failed to set user role');
    }
  });
});
