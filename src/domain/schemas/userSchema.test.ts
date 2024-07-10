import { userRoleSchema } from '@src/domain/schemas/userSchema';
import { UserRole } from '@src/domain/entities/UserEntity';
import { ZodError } from 'zod';

describe('userRoleSchema', () => {
  it('should validate the admin role', () => {
    expect(() => userRoleSchema.parse(UserRole.ADMIN)).not.toThrow();
  });

  it('should validate the user role', () => {
    expect(() => userRoleSchema.parse(UserRole.USER)).not.toThrow();
  });

  it('should invalidate an invalid role', () => {
    expect(() => userRoleSchema.parse('invalid_role')).toThrow(ZodError);
  });

  it('should invalidate an empty role', () => {
    expect(() => userRoleSchema.parse('')).toThrow(ZodError);
  });
});
