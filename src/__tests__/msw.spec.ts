import { describe, it, expect } from 'vitest';

describe('MSW Server', () => {
  // Test 1: Check a handled request
  it('should intercept the GET /pokemon request and return mocked data', async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.results).toBeInstanceOf(Array);
    expect(data.results[0].name).toBe('bulbasaur'); // This name comes from your mock handler
  });

  // Test 2: Check an unhandled request
  it('should throw an error for unhandled requests', async () => {
    // This URL is not defined in our src/test/handlers.ts file
    const unhandledRequest = fetch('https://api.example.com/unhandled-route');

    // We expect this promise to reject with an error from MSW
    await expect(unhandledRequest).rejects.toThrow(
      '[MSW] Cannot bypass a request when using the "error" strategy for the "onUnhandledRequest" option.'
    );
  });
});
