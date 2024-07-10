//TODO: NOT USING
// USING IN CONTROLLER
import { User, UserRole } from '@src/domain/entities/UserEntity';

export class UserViewModel {
  constructor(public role: UserRole) {}

  static fromDomain(user: User): UserViewModel {
    return new UserViewModel(user.role);
  }
}
