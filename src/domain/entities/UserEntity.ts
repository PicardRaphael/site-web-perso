/**
 * Enumeration for User Roles.
 * @enum {string}
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

/**
 * Interface representing a User.
 * @interface
 */
export interface User {
  id: string;
  role: UserRole;
}
