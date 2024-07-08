import { UserRole } from '@src/constants/userRoles';
import { User } from '@src/domain/entities/UserEntitiy';

export class UserViewModel {
  constructor(public role: UserRole) {}

  static fromDomain(user: User): UserViewModel {
    return new UserViewModel(user.role);
  }
}
