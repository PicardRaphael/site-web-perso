// jest.setup.js

import { server } from './server';
import 'whatwg-fetch';
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
