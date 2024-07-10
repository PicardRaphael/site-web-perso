import { UserContainer } from '@src/dependencyInjection/user/UserContainer';
import { UserController } from '@src/interface/controllers/UserController';
import { UserService } from '@src/application/services/UserService';
import { UserRepository } from '@src/infrastructure/adapters/user/UserRepository';

jest.mock('@src/infrastructure/adapters/user/UserRepository');
jest.mock('@src/application/services/UserService');
jest.mock('@src/interface/controllers/UserController');

describe('UserContainer', () => {
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let userServiceMock: jest.Mocked<UserService>;
  let userControllerMock: jest.Mocked<UserController>;

  beforeAll(() => {
    const {
      createMockUserRepository,
      createMockUserService,
      createMockUserController,
    } = require('@src/__mocks__/helpers');
    userRepositoryMock = createMockUserRepository();
    userServiceMock = createMockUserService();
    userControllerMock = createMockUserController();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (UserRepository as jest.Mock).mockReturnValue(userRepositoryMock);
    (UserService as jest.Mock).mockReturnValue(userServiceMock);
    (UserController as jest.Mock).mockReturnValue(userControllerMock);
  });

  it('should create a single instance of UserContainer', () => {
    const container1 = UserContainer.getInstance();
    const container2 = UserContainer.getInstance();
    expect(container1).toBe(container2);
  });

  it('should return an instance of UserController', () => {
    const container = UserContainer.getInstance();
    expect(container.getUserController()).toBe(userControllerMock);
  });

  it('should return an instance of UserService', () => {
    const container = UserContainer.getInstance();
    expect(container.getUserService()).toBe(userServiceMock);
  });

  it('should return an instance of UserRepository', () => {
    const container = UserContainer.getInstance();
    expect(container.getUserRepository()).toBe(userRepositoryMock);
  });
});
