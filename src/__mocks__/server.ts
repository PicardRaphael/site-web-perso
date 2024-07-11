import { http, HttpResponse } from 'msw';
import { UserRole } from '@src/domain/entities/UserEntity';
import { setupServer } from 'msw/node';

export const handlers = [
  http.post('*/api/auth', async ({ request }) => {
    const body = await request.json();
    const { role } = body as { role: UserRole };
    if (!role) {
      return HttpResponse.json(
        { success: false, error: 'Role not provided' },
        { status: 400 }
      );
    }
    return HttpResponse.json({ success: true, data: role }, { status: 200 });
  }),
];
export const server = setupServer(...handlers);
