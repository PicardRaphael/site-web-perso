import { RootContainer } from '@src/dependencyInjection/RootContainer';
import { createMockUserController } from './createMockUserController';

export function createMockRootContainer(): jest.Mocked<typeof RootContainer> {
  return {
    getUserContainer: jest.fn().mockReturnValue({
      getUserController: jest.fn().mockReturnValue(createMockUserController()),
    }),
  } as unknown as jest.Mocked<typeof RootContainer>;
}
