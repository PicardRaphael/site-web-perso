import { z } from 'zod';
import { UserRole } from '../entities/UserEntity';

export const userRoleSchema = z.enum([UserRole.USER, UserRole.ADMIN]);
