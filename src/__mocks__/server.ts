import { http, HttpResponse } from 'msw';
import { UserRole } from '@src/domain/entities/UserEntity';
import { setupServer } from 'msw/node';

export const handlers = [
  http.post('*/api/auth', ({ request }) => {
    const { role } = request.body as unknown as { role: UserRole };
    if (!role) {
      return HttpResponse.error();
    }
    return HttpResponse.json({ success: true, data: role }, { status: 200 });
  }),
];
export const server = setupServer(...handlers);
