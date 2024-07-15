import { UserRepository } from '@src/infrastructure/adapters/user/UserRepository';
import { IUserContainer } from './IUserContainer';
import { UserService } from '@src/application/services/UserService';
import { UserController } from '@src/interface/controllers/UserController';

/**
 * UserContainer class that implements the IUserContainer interface.
 * Provides a singleton instance to manage the dependencies for UserController, UserService, and UserRepository.
 *
 * @class UserContainer
 * @implements {IUserContainer}
 */
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

  /**
   * Gets the singleton instance of UserContainer.
   *
   * @returns {UserContainer} - The singleton instance of UserContainer.
   */
  public static getInstance(): UserContainer {
    if (!UserContainer.instance) {
      UserContainer.instance = new UserContainer();
    }
    return UserContainer.instance;
  }

  /**
   * Gets an instance of UserController.
   *
   * @returns {UserController} - An instance of UserController.
   */
  public getUserController(): UserController {
    return this.userController;
  }

  /**
   * Gets an instance of UserService.
   *
   * @returns {UserService} - An instance of UserService.
   */
  public getUserService(): UserService {
    return this.userService;
  }

  /**
   * Gets an instance of UserRepository.
   *
   * @returns {UserRepository} - An instance of UserRepository.
   */
  public getUserRepository(): UserRepository {
    return this.userRepository;
  }
}
