import '@testing-library/jest-dom';

// Mocking Next.js router
jest.mock('next/router', () => require('next-router-mock'));
