import { User, UserRole } from '@src/domain/entities/UserEntity';
import { UserViewModel } from '@src/interface/view-models/UserViewModel';

describe('UserViewModel', () => {
  it('should create an instance of UserViewModel with the correct role', () => {
    const role = UserRole.ADMIN;
    const userViewModel = new UserViewModel(role);

    expect(userViewModel).toBeInstanceOf(UserViewModel);
    expect(userViewModel.role).toBe(role);
  });

  it('should create a UserViewModel from a User domain model', () => {
    const user: User = { id: '1', role: UserRole.USER };
    const userViewModel = UserViewModel.fromDomain(user);

    expect(userViewModel).toBeInstanceOf(UserViewModel);
    expect(userViewModel.role).toBe(user.role);
  });
});
