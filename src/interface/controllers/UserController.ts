import { UserService } from '@src/application/services/UserService';
import { UserRole } from '@src/constants/userRoles';

/**
 * UserController class handling HTTP requests for user management.
 */
export class UserController {
  private static instance: UserController;
  private userService: UserService;
  constructor() {
    const userService = UserService.getInstance();
    this.userService = userService;
  }

  async setUserRoleAction(role: UserRole) {
    const userRole = await this.userService.setUserRoleInCookies(role);
    return userRole;
  }
  async getUserRoleAction() {
    return await this.userService.getUserRoleFromCookies();
  }
  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }
}
