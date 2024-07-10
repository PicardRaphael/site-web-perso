import { IUserRepository } from '@src/domain/repositories/IUserRepository';
import { cookies } from 'next/headers';
import { ErrorHandler, SuccessResponse } from '@src/utils/error/ErrorHanlder';
import { UserRole } from '@src/domain/entities/UserEntity';

export class UserRepository implements IUserRepository {
  async getRoleFromCookie(): Promise<Boolean> {
    const token = cookies().get('auth_token')?.value;
    if (token === 'admin') {
      return true;
    }
    return false;
  }

  async setRoleInCookie(role: UserRole): Promise<SuccessResponse<UserRole>> {
    cookies().set('auth_token', role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    });
    return ErrorHandler.handleSuccess(role);
  }
}
