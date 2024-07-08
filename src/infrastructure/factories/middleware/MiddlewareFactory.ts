import type { IMiddleware } from '@src/application/ports/middlewares/IMiddleware';
import type { IMiddlewareFactory } from '@src/application/ports/middlewares/IMiddlewareFactory ';
import { AuthMiddleware } from '@src/infrastructure/adapters/middlewares/AuthMiddlewareRepository';

export class MiddlewareFactory implements IMiddlewareFactory {
  createAuthMiddleware(): IMiddleware {
    return new AuthMiddleware();
  }
}
