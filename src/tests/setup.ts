import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './server';
import '@testing-library/jest-dom';

console.log('--- Vitest setup file loaded successfully! ---');

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
