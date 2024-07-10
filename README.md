# Architecture du Projet NextJS

Ce projet suit une architecture hexagonale (ou en oignon) adaptée à NextJS, avec une séparation claire des préoccupations et une structure modulaire.

## Structure du Projet

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

## Couches de l'Architecture

### 1. Domain

La couche domaine contient les entités métier, les interfaces des repositories, les schémas de validation et les cas d'utilisation.

- `entities/`: Définitions des entités métier (ex: UserEntity.ts)
- `repositories/`: Interfaces des repositories (ex: IUserRepository.ts)
- `schemas/`: Schémas de validation Zod (ex: userSchema.ts)
- `use-cases/`: Définitions des cas d'utilisation (ex: UserUseCase.ts)

### 2. Application

La couche application contient la logique métier et les services.

- `ports/`: Interfaces pour les contrôleurs et services
- `services/`: Implémentations des services métier

### 3. Infrastructure

La couche infrastructure gère les détails techniques comme la persistance des données et les middlewares.

- `adapters/`: Implémentations concrètes des repositories
- `factories/`: Factories pour la création de middlewares
- `middlewares/`: Définitions des middlewares

### 4. Interface

La couche interface gère l'interaction avec l'utilisateur et la présentation.

- `components/`: Composants React réutilisables
- `controllers/`: Contrôleurs pour gérer les requêtes
- `hooks/`: Hooks React personnalisés
- `routes/`: Définitions des routes API
- `state/`: Gérera l'état global de l'application avec Zustand
- `view-models/`: Modèles de vue pour la présentation des données

### 5. Dependency Injection

Gestion de l'injection des dépendances pour découpler les composants.

- `user/`: Conteneurs spécifiques aux utilisateurs
- `rootContainer.ts`: Conteneur racine pour l'application

### 6. Utils

Utilitaires et helpers pour l'application.

- `error/`: Gestion des erreurs et des toasts

### 7. App

Dossier spécifique à NextJS pour les pages et les composants de l'application.

- `api/`: Routes API de NextJS
- `_actions/`: Actions serveur pour les formulaires et les mutations
- `_components/`: Composants spécifiques aux pages
- `layout.tsx`: Layout principal de l'application
- `page.tsx`: Page principale de l'application

## Conventions de Nommage

- **Fichiers**: Utilisez le PascalCase pour les classes et les interfaces (ex: `UserEntity.ts`, `IUserRepository.ts`) et le kebab-case pour les autres fichiers (ex: `user-schema.ts`).
- **Classes**: Utilisez le PascalCase (ex: `class UserController {}`).
- **Interfaces**: Préfixez avec "I" et utilisez le PascalCase (ex: `interface IUserService {}`).
- **Méthodes et Variables**: Utilisez le camelCase (ex: `getUserById()`, `currentUser`).
- **Constantes**: Utilisez le SNAKE_CASE en majuscules (ex: `const MAX_USERS = 100`).

## Gestion d'État avec Zustand

Pour intégrer Zustand dans cette architecture :

1. Créez un nouveau dossier `src/interface/state/` pour les stores Zustand.
2. Implémentez vos stores dans ce dossier (ex: `userStore.ts`).
3. Utilisez les stores dans vos composants et hooks React.

Exemple de structure pour un store Zustand :

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

## Flux Typique d'une Requête

Voici comment une requête typique traverse les différentes couches de l'architecture :

Entrée de la requête :
Une requête arrive via une route API dans app/api/ ou une action serveur dans app/\_actions/.

Couche Interface :
La route ou l'action utilise un contrôleur de la couche Interface (ex: UserController).
Le contrôleur peut utiliser un view-model pour formater les données d'entrée si nécessaire.

Couche Application :
Le contrôleur appelle un service de la couche Application (ex: UserService).
Le service implémente la logique métier en utilisant les cas d'utilisation du Domaine.

Couche Domaine :
Le service utilise les entités, les cas d'utilisation et les interfaces des repositories définis dans le Domaine.
Les règles métier sont appliquées à ce niveau.

Couche Infrastructure :
Les données sont récupérées ou modifiées via les adaptateurs de l'Infrastructure (ex: UserRepository).
Ces adaptateurs implémentent les interfaces de repository définies dans le Domaine.

Remontée des résultats :
Les résultats remontent la chaîne, passant par le service, puis le contrôleur.
Les données peuvent être transformées par des view-models pour les adapter à la présentation.

Réponse :
La réponse formatée est renvoyée au client.

Gestion de l'état côté client (si applicable) :
Pour les interactions côté client, les hooks React (ex: useCreateRoleUser) peuvent être utilisés pour déclencher des actions.
L'état global géré par Zustand (src/interface/state/userStore.ts) peut être mis à jour avec les nouvelles données.

Ce flux assure une séparation claire des responsabilités et permet une grande flexibilité et testabilité à chaque étape du processus.

## Ajout de Nouvelles Entités

Pour ajouter une nouvelle entité à l'architecture :

1. Créez l'entité dans `src/domain/entities/`.
2. Définissez l'interface du repository dans `src/domain/repositories/`.
3. Créez le schéma Zod dans `src/domain/schemas/`.
4. Implémentez le use case dans `src/domain/use-cases/`.
5. Créez le service dans `src/application/services/`.
6. Implémentez le repository dans `src/infrastructure/adapters/`.
7. Créez le contrôleur dans `src/interface/controllers/`.
8. Définissez le view model dans `src/interface/view-models/`.
9. Ajoutez les routes nécessaires dans `src/interface/routes/`.
10. Créez les hooks React nécessaires dans `src/interface/hooks/`.
11. Mettez à jour le conteneur d'injection de dépendances dans `src/dependencyInjection/`.

## Tests

Ajoutez des tests unitaires et d'intégration pour chaque couche de l'architecture. Utilisez Jest et React Testing Library pour les tests.

## Documentation

Documentez chaque module, classe et fonction importante. Utilisez JSDoc pour la documentation inline.

## Contribution

Suivez les conventions de nommage et la structure du projet lors de l'ajout de nouvelles fonctionnalités. Assurez-vous de mettre à jour la documentation si nécessaire.
