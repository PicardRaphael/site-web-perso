import { ErrorResponse, SuccessResponse } from '@src/utils/error/ErrorHanlder';
import { UserRole } from '../entities/UserEntity';

/**
 * Interface représentant le cas d'utilisation pour la gestion des rôles utilisateurs.
 * Définit les méthodes pour obtenir et définir le rôle de l'utilisateur.
 */
export interface UserUseCase {
  /**
   * Récupère le rôle de l'utilisateur à partir des cookies.
   * @returns {Promise<Boolean>} - Un booléen indiquant si l'utilisateur a un rôle défini.
   */
  getUserRole(): Promise<Boolean>;

  /**
   * Définit le rôle de l'utilisateur dans les cookies.
   * @param {UserRole} role - Le rôle à définir pour l'utilisateur.
   * @returns {Promise<SuccessResponse<UserRole> | ErrorResponse>} - Une promesse avec une réponse de succès ou d'erreur.
   */
  setUserRole(
    role: UserRole
  ): Promise<SuccessResponse<UserRole> | ErrorResponse>;
}
