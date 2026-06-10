import { test, expect } from '../../fixtures';
import { buildUser } from '../../data/factories/userFactory';

test.describe('@e2e Hybrid API + UI', () => {
  test('API creates data and UI page remains reachable', async ({ postsApi, homePage }) => {
    const user = buildUser();
    const response = await postsApi.create({
      title: `Hybrid test ${user.username}`,
      body: 'API setup verified by UI smoke',
      userId: 1,
    });

    await postsApi.expectStatus(response, 201);

    const created = await response.json();
    expect(created.id).toBeTruthy();

    await homePage.open();
    await homePage.expectLoaded();
    await expect(homePage.heading).toBeVisible();
  });
});
