import { MiddlewareChain } from '@src/infrastructure/factories/middleware/MiddlewareChain';
import { MiddlewareFactory } from '@src/infrastructure/factories/middleware/MiddlewareFactory';
import type { NextRequest } from 'next/server';

// Crée une instance de la factory
const middlewareFactory = new MiddlewareFactory();

// Utilise la factory pour créer le middleware d'authentification
const authMiddleware = middlewareFactory.createAuthMiddleware();

// Ajoutez d'autres middlewares ici si nécessaire
const middlewares = [authMiddleware];

// Crée une chaîne de middlewares
const middlewareChain = new MiddlewareChain(middlewares);

export async function middleware(request: NextRequest) {
  console.log('Request received:', request.nextUrl.pathname);
  return middlewareChain.handle(request);
}

export const config = {
  matcher: middlewareChain.matcher,
};
