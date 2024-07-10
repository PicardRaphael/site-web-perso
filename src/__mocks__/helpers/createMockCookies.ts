import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export function createMockCookies(): {
  get: jest.Mock<RequestCookie | undefined, [string]>;
  set: jest.Mock<void, [string, string, object]>;
  delete: jest.Mock<void, [string]>;
} {
  return {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  };
}
