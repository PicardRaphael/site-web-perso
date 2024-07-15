import { UserService } from '@src/application/services/UserService';
import { UserRepository } from '@src/infrastructure/adapters/user/UserRepository';
import { UserController } from '@src/interface/controllers/UserController';

/**
 * Interface representing a user container.
 * Provides methods to get instances of UserController, UserService, and UserRepository.
 *
 * @interface IUserContainer
 */
export interface IUserContainer {
  /**
   * Gets an instance of UserController.
   *
   * @returns {UserController} - An instance of UserController.
   */
  getUserController(): UserController;

  /**
   * Gets an instance of UserService.
   *
   * @returns {UserService} - An instance of UserService.
   */
  getUserService(): UserService;

  /**
   * Gets an instance of UserRepository.
   *
   * @returns {UserRepository} - An instance of UserRepository.
   */
  getUserRepository(): UserRepository;
}
