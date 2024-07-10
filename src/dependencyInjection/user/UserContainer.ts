import { UserRepository } from '@src/infrastructure/adapters/user/UserRepository';
import { IUserContainer } from './IUserContainer';
import { UserService } from '@src/application/services/UserService';
import { UserController } from '@src/interface/controllers/UserController';

export class UserContainer implements IUserContainer {
  private static instance: UserContainer;
  private userRepository: UserRepository;
  private userService: UserService;
  private userController: UserController;

  private constructor() {
    this.userRepository = new UserRepository();
    this.userService = new UserService(this.userRepository);
    this.userController = new UserController(this.userService);
  }

  public static getInstance(): UserContainer {
    if (!UserContainer.instance) {
      UserContainer.instance = new UserContainer();
    }
    return UserContainer.instance;
  }

  public getUserController(): UserController {
    return this.userController;
  }

  public getUserService(): UserService {
    return this.userService;
  }

  public getUserRepository(): UserRepository {
    return this.userRepository;
  }
}
