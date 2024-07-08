import { IMiddleware } from './IMiddleware';

/**
 * IMiddlewareFactory interface.
 * Defines the contract for middleware factories.
 */
export interface IMiddlewareFactory {
  /**
   * Creates an instance of AuthMiddleware.
   * @returns {IMiddleware} - An instance of AuthMiddleware.
   */
  createAuthMiddleware(): IMiddleware;
}
