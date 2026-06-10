import { test, expect } from '../../fixtures';

test.describe('@api @smoke Health API', () => {
  test('health endpoint returns 200', async ({ healthApi }) => {
    const response = await healthApi.check();

    await healthApi.expectOk(response);
    expect(response.status()).toBe(200);
  });
});
