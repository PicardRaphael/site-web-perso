import { createMockUserContainer } from '@src/__mocks__/helpers';
import { RootContainer } from './RootContainer';

jest.mock('./user/UserContainer', () => {
  return {
    UserContainer: {
      getInstance: jest.fn().mockReturnValue(createMockUserContainer()),
    },
  };
});

describe('RootContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a single instance of RootContainer', () => {
    const container1 = RootContainer.getInstance();
    const container2 = RootContainer.getInstance();
    expect(container1).toBe(container2);
  });

  it('should return an instance of UserContainer', () => {
    const container = RootContainer.getInstance();
    expect(container.getUserContainer()).toBeInstanceOf(Object); // Vérifier l'instance mockée
  });

  it('UserContainer should return expected mocks', () => {
    const userContainer = RootContainer.getInstance().getUserContainer();
    expect(userContainer.getUserController()).toBeInstanceOf(Object);
    expect(userContainer.getUserService()).toBeInstanceOf(Object);
    expect(userContainer.getUserRepository()).toBeInstanceOf(Object);
  });
});
