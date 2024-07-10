import { UserService } from '@src/application/services/UserService';
import { UserRepository } from '@src/infrastructure/adapters/user/UserRepository';
import { UserController } from '@src/interface/controllers/UserController';

export interface IUserContainer {
  getUserController(): UserController;
  getUserService(): UserService;
  getUserRepository(): UserRepository;
}
