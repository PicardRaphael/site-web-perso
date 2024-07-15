# Project Architecture for NextJS

This project follows a hexagonal (or onion) architecture adapted for NextJS, with a clear separation of concerns and a modular structure.

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── auth/
│   ├── _actions/
│   ├── _components/
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── __mocks__/
│   │   ├── helpers/
│   │   │   ├── server.ts
│   │   │   └── setupTests.ts
│   ├── application/
│   │   ├── ports/
│   │   │   └── user/
│   │   │       ├── IUserController.ts
│   │   │       └── IUserService.ts
│   │   └── services/
│   │       └── UserService.ts
│   ├── dependencyInjection/
│   │   ├── user/
│   │   │   ├── IUserContainer.ts
│   │   │   └── UserContainer.ts
│   │   └── rootContainer.ts
│   ├── domain/
│   │   ├── entities/
│   │   │   └── UserEntity.ts
│   │   ├── repositories/
│   │   │   └── IUserRepository.ts
│   │   ├── schemas/
│   │   │   └── userSchema.ts
│   │   └── use-cases/
│   │       └── UserUseCase.ts
│   ├── infrastructure/
│   │   ├── adapters/
│   │   │   └── user/
│   │   │       └── UserRepository.ts
│   │   └──  factories/
│   │   │   └── middleware/
│   │   │       ├── MiddlewareChain.ts
│   │   │       └── MiddlewareFactory.ts
│   │   └── middlewares/
│   │           └── AuthMiddleware.ts
│   ├── interface/
│   │   ├── state/
│   │   ├── components/
│   │   ├── controllers/
│   │   │   └── UserController.ts
│   │   ├── hooks/
│   │   │   └── user/
│   │   │       └── useCreateRoleUser.ts
│   │   ├── routes/
│   │   │   └── userRoutes.ts
│   │   └── view-models/
│   │       └── UserViewModel.ts
│   └── utils/
│       └── error/
│           ├── ErrorHandler.ts
│           └── ToastHandler.ts
└── middleware.ts
```

## Architecture Layers

### 1. Domain

The domain layer contains business entities, repository interfaces, validation schemas, and use cases.

- `entities/`: Business entity definitions (e.g., `UserEntity.ts`)
- `repositories/`: Repository interfaces (e.g., `IUserRepository.ts`)
- `schemas/`: Zod validation schemas (e.g., `userSchema.ts`)
- `use-cases/`: Use case definitions (e.g., `UserUseCase.ts`)

### 2. Application

The application layer contains business logic and services.

- `ports/`: Interfaces for controllers and services
- `services/`: Business service implementations

### 3. Infrastructure

The infrastructure layer manages technical details such as data persistence and middleware.

- `adapters/`: Concrete repository implementations
- `factories/`: Middleware creation factories
- `middlewares/`: Middleware definitions

### 4. Interface

The interface layer handles user interaction and presentation.

- `components/`: Reusable React components
- `controllers/`: Controllers to manage requests
- `hooks/`: Custom React hooks
- `routes/`: API route definitions
- `state/`: Global application state management with Zustand
- `view-models/`: View models for data presentation

### 5. Dependency Injection

Manages dependency injection to decouple components.

- `user/`: User-specific containers
- `rootContainer.ts`: Root container for the application

### 6. Utils

Utilities and helpers for the application.

- `error/`: Error and toast handling

### 7. App

NextJS-specific folder for pages and application components.

- `api/`: NextJS API routes
- `_actions/`: Server actions for forms and mutations
- `_components/`: Page-specific components
- `layout.tsx`: Main application layout
- `page.tsx`: Main application page

## Naming Conventions

- **Files**: Use PascalCase for classes and interfaces (e.g., `UserEntity.ts`, `IUserRepository.ts`) and kebab-case for other files (e.g., `user-schema.ts`).
- **Classes**: Use PascalCase (e.g., `class UserController {}`).
- **Interfaces**: Prefix with "I" and use PascalCase (e.g., `interface IUserService {}`).
- **Methods and Variables**: Use camelCase (e.g., `getUserById()`, `currentUser`).
- **Constants**: Use uppercase SNAKE_CASE (e.g., `const MAX_USERS = 100`).

## State Management with Zustand

To integrate Zustand into this architecture:

1. Create a new `src/interface/state/` folder for Zustand stores.
2. Implement your stores in this folder (e.g., `userStore.ts`).
3. Use the stores in your React components and hooks.

Example structure for a Zustand store:

```typescript
// src/interface/state/userStore.ts
import create from 'zustand';
import { UserViewModel } from '../view-models/UserViewModel';

interface UserState {
  currentUser: UserViewModel | null;
  setCurrentUser: (user: UserViewModel) => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
```

## Typical Request Flow

Here's how a typical request flows through the different layers of the architecture:

### Request Entry

A request arrives via an API route in `app/api/` or a server action in `app/_actions/`.

### Interface Layer

The route or action uses a controller from the Interface layer (e.g., `UserController`). The controller may use a view model to format input data if necessary.

### Application Layer

The controller calls a service from the Application layer (e.g., `UserService`). The service implements business logic using use cases from the Domain.

### Domain Layer

The service uses entities, use cases, and repository interfaces defined in the Domain. Business rules are applied at this level.

### Infrastructure Layer

Data is retrieved or modified via adapters in the Infrastructure (e.g., `UserRepository`). These adapters implement the repository interfaces defined in the Domain.

### Result Propagation

Results propagate back up the chain, through the service and then the controller. Data can be transformed by view models to adapt to the presentation.

### Response

The formatted response is sent back to the client.

### Client-side State Management (if applicable)

For client-side interactions, React hooks (e.g., `useCreateRoleUser`) can be used to trigger actions. Global state managed by Zustand (`src/interface/state/userStore.ts`) can be updated with the new data.

This flow ensures a clear separation of responsibilities and allows for great flexibility and testability at each stage of the process.

## Adding New Entities

To add a new entity to the architecture:

1. Create the entity in `src/domain/entities/`.
2. Define the repository interface in `src/domain/repositories/`.
3. Create the Zod schema in `src/domain/schemas/`.
4. Implement the use case in `src/domain/use-cases/`.
5. Create the service in `src/application/services/`.
6. Implement the repository in `src/infrastructure/adapters/`.
7. Create the controller in `src/interface/controllers/`.
8. Define the view model in `src/interface/view-models/`.
9. Add the necessary routes in `src/interface/routes/`.
10. Create the necessary React hooks in `src/interface/hooks/`.
11. Update the dependency injection container in `src/dependencyInjection/`.

## Testing

Add unit and integration tests for each layer of the architecture. Use Jest, Msw, and React Testing Library for testing.

## Documentation

Document each module, class, and important function. Use JSDoc for inline documentation.

## Contribution

Follow naming conventions and project structure when adding new features. Ensure to update the documentation if necessary.
