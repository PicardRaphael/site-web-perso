import { UserController } from '@src/interface/controllers/UserController';

export function createMockUserController(): jest.Mocked<UserController> {
  const mock = {
    setUserRole: jest.fn(),
    getUserRole: jest.fn(),
  } as unknown as jest.Mocked<UserController>;
  return mock;
}
