import { test, expect } from '../../fixtures';
import { buildUser } from '../../data/factories/userFactory';

test.describe('@api @regression Posts API', () => {
  test('GET /posts returns a list', async ({ postsApi }) => {
    const response = await postsApi.getAll();

    await postsApi.expectOk(response);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
  });

  test('GET /posts/1 returns a validated post', async ({ postsApi }) => {
    const post = await postsApi.getByIdValidated(1);

    expect(post.id).toBe(1);
    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();
  });

  test('POST /posts creates a post', async ({ postsApi }) => {
    const user = buildUser();
    const payload = {
      title: `Post by ${user.username}`,
      body: 'Created by Playwright API framework',
      userId: 1,
    };

    const response = await postsApi.create(payload);
    await postsApi.expectStatus(response, 201);

    const created = await response.json();
    expect(created).toMatchObject(payload);
    expect(created.id).toBeTruthy();
  });
});
