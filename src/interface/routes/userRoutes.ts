import { UserRole } from '@src/domain/entities/UserEntity';
import { SuccessResponse } from '@src/utils/error/ErrorHanlder';

export const setUserRole = async (
  role: UserRole
): Promise<SuccessResponse<UserRole>> => {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
  if (!response.ok) {
    throw new Error('Failed to set user role');
  }
  const data = await response.json();
  return data;
};
