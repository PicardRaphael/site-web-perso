import { UserService } from '@src/application/services/UserService';
import { UserRole } from '@src/constants/userRoles';
import { userRoleSchema } from '../schemas/userSchema';
import { ErrorHandler } from '@src/utils/error/ErrorHanlder';

export class UserUseCase {
  constructor(private userService: UserService) {}

  getUserRoleFromCookies() {
    try {
      return this.userService.getUserRoleFromCookies();
    } catch (error) {
      throw ErrorHandler.handleApiError(error);
    }
  }
  setUserRoleInCookies(role: UserRole) {
    try {
      const validatedData = userRoleSchema.parse(role);
      return this.userService.setUserRoleInCookies(validatedData);
    } catch (error) {
      throw ErrorHandler.handleApiError(error);
    }
  }
}
