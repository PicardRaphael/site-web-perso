import { IUserRepository } from '@src/application/ports/user/IUserRepository';
import { UserRole } from '@src/constants/userRoles';
import { ErrorHandler, SuccessResponse } from '@src/utils/error/ErrorHanlder';
import { cookies } from 'next/headers';

export class UserRepository implements IUserRepository {
  setRoleInCookie(role: UserRole): SuccessResponse<UserRole> {
    cookies().set('auth_token', role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 heure
      path: '/',
    });
    return ErrorHandler.handleSuccess(role);
  }
  getRoleByCookie(): Boolean {
    const token = cookies().get('auth_token')?.value;
    console.log('token)', token);
    if (token === 'admin') {
      return true;
    }
    return false;
  }
}
