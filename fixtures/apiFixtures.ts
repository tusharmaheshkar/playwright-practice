import { test as base } from '@playwright/test';
import { BaseApiClient } from '../api/BaseApiClient';
import { HealthApi } from '../api/services/HealthApi';
import { PostsApi } from '../api/services/PostsApi';
import { env } from '../config/env';

export type ApiFixtures = {
  apiClient: BaseApiClient;
  healthApi: HealthApi;
  postsApi: PostsApi;
};

export const apiFixtures = base.extend<ApiFixtures>({
  request: async ({ playwright }, use) => {
    const apiRequest = await playwright.request.newContext({
      baseURL: env.apiBaseUrl,
    });
    await use(apiRequest);
    await apiRequest.dispose();
  },

  apiClient: async ({ request }, use) => {
    await use(new BaseApiClient(request));
  },

  healthApi: async ({ request }, use) => {
    await use(new HealthApi(request));
  },

  postsApi: async ({ request }, use) => {
    await use(new PostsApi(request));
  },
});
