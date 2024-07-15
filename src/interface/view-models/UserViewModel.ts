//TODO: NOT USING
// USING IN CONTROLLER
import { User, UserRole } from '@src/domain/entities/UserEntity';

/**
 * ViewModel for the User entity.
 * Provides a structure for presenting user data.
 */
export class UserViewModel {
  public role: UserRole;

  /**
   * Constructor for UserViewModel.
   * @param {UserRole} role - The role of the user.
   */
  constructor(role: UserRole) {
    this.role = role;
  }

  /**
   * Creates a UserViewModel from a User domain entity.
   * @param {User} user - The user domain entity.
   * @returns {UserViewModel} - The user view model.
   */
  static fromDomain(user: User): UserViewModel {
    return new UserViewModel(user.role);
  }
}
