import { IUserRepository } from '@src/domain/repositories/IUserRepository';
import { cookies } from 'next/headers';
import { ErrorHandler, SuccessResponse } from '@src/utils/error/ErrorHanlder';
import { UserRole } from '@src/domain/entities/UserEntity';

/**
 * Classe représentant le dépôt utilisateur, implémentant l'interface IUserRepository.
 * Gère la récupération et la définition des rôles utilisateurs dans les cookies.
 */
export class UserRepository implements IUserRepository {
  /**
   * Récupère le rôle de l'utilisateur à partir des cookies.
   * @returns {Promise<Boolean>} - Un booléen indiquant si l'utilisateur est administrateur.
   */
  async getRoleFromCookie(): Promise<Boolean> {
    const token = cookies().get('auth_token')?.value;
    if (token === 'admin') {
      return true;
    }
    return false;
  }

  /**
   * Définit le rôle de l'utilisateur dans les cookies.
   * @param {UserRole} role - Le rôle à définir pour l'utilisateur.
   * @returns {Promise<SuccessResponse<UserRole>>} - Une promesse avec une réponse de succès contenant le rôle défini.
   */
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
