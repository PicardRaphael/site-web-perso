import { UserRole } from '@src/constants/userRoles';
import type { IUserRepository } from '@src/application/ports/user/IUserRepository';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { UserRepository } from '@src/infrastructure/adapters/user/UserRepository';

/**
 * UserService class containing business logic for user management.
 */
export class UserService {
  private static instance: UserService;
  private userRepository: IUserRepository;
  constructor() {
    const userRepository = new UserRepository();
    this.userRepository = userRepository;
  }

  setUserRoleInCookies(role: UserRole) {
    return this.userRepository.setRoleInCookie(role);
  }
  getUserRoleFromCookies() {
    return this.userRepository.getRoleByCookie();
  }
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }
}
