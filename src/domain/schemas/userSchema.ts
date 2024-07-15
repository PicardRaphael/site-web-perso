import { z } from 'zod';
import { UserRole } from '../entities/UserEntity';

/**
 * Schema de validation pour le rôle de l'utilisateur.
 * Utilise zod pour définir les valeurs acceptables pour le rôle d'utilisateur.
 * @constant
 * @type {z.ZodEnum<[UserRole.USER, UserRole.ADMIN]>}
 */
export const userRoleSchema = z.enum([UserRole.USER, UserRole.ADMIN]);
