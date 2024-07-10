import { UserService } from '@src/application/services/UserService';

export function createMockUserService(): jest.Mocked<UserService> {
  const mock = {
    getUserRole: jest.fn(),
    setUserRole: jest.fn(),
  } as unknown as jest.Mocked<UserService>;
  return mock;
}
