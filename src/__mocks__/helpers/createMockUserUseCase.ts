import { UserUseCase } from '@src/domain/use-cases/UserUseCase';

export function createMockUserUseCase(): jest.Mocked<UserUseCase> {
  return {
    getUserRole: jest.fn(),
    setUserRole: jest.fn(),
  } as unknown as jest.Mocked<UserUseCase>;
}
