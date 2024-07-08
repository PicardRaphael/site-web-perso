import { NextRequest } from 'next/server';

export function checkIfUserIsAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('auth_token');
  if (token && token.value === 'admin_token') {
    return true;
  }
  return false;
}
