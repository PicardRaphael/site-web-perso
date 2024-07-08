import { IMiddleware } from './IMiddleware';

export interface IMiddlewareFactory {
  createAuthMiddleware(): IMiddleware;
}
