import type { IMiddleware } from '@src/application/ports/middlewares/IMiddleware';
import type { IMiddlewareFactory } from '@src/application/ports/middlewares/IMiddlewareFactory ';
import { AuthMiddleware } from '@src/infrastructure/middlewares/AuthMiddleware';

/**
 * MiddlewareFactory class that implements the IMiddlewareFactory interface.
 * Used to create instances of middlewares.
 */
export class MiddlewareFactory implements IMiddlewareFactory {
  /**
   * Creates an instance of AuthMiddleware.
   * @returns {IMiddleware} - An instance of AuthMiddleware.
   */
  createAuthMiddleware(): IMiddleware {
    return new AuthMiddleware();
  }
}
