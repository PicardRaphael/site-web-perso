import { UserContainer } from '@src/dependencyInjection/user/UserContainer';
import { createMockUserController } from './createMockUserController';
import { createMockUserRepository } from './createMockUserRepository';
import { createMockUserService } from './createMockUserService';

export function createMockUserContainer(): jest.Mocked<UserContainer> {
  return {
    getUserController: jest.fn().mockReturnValue(createMockUserController()),
    getUserService: jest.fn().mockReturnValue(createMockUserService()),
    getUserRepository: jest.fn().mockReturnValue(createMockUserRepository()),
  } as unknown as jest.Mocked<UserContainer>;
}
