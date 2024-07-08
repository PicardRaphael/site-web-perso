import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { role } = await request.json();

  // Simuler un token JWT (ne pas utiliser ceci en production !)
  const token = role === 'admin' ? 'admin_token' : 'user_token';

  // Définir le cookie
  cookies().set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // 1 heure
    path: '/',
  });

  return NextResponse.json({ success: true });
}
