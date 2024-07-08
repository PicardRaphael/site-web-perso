import { z } from 'zod';
import { UserRole } from '@src/constants/userRoles';

export const userRoleSchema = z.enum([UserRole.User, UserRole.Admin]);
