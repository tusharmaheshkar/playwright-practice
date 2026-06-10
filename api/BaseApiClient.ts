import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { env } from '../config/env';

export type RequestOptions = {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
};

export class BaseApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected defaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    if (env.apiToken) {
      headers.Authorization = `Bearer ${env.apiToken}`;
    }

    if (env.apiKey) {
      headers['X-API-Key'] = env.apiKey;
    }

    return headers;
  }

  protected buildUrl(path: string, params?: RequestOptions['params']): string {
    if (!params) {
      return path;
    }

    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      search.append(key, String(value));
    }

    const separator = path.includes('?') ? '&' : '?';
    return `${path}${separator}${search.toString()}`;
  }

  protected log(method: string, path: string, data?: unknown) {
    if (env.debugApi) {
      console.log(`[API] ${method} ${path}`, data ?? '');
    }
  }

  protected get(path: string, options?: RequestOptions) {
    const url = this.buildUrl(path, options?.params);
    this.log('GET', url);
    return this.request.get(url, {
      headers: { ...this.defaultHeaders(), ...options?.headers },
    });
  }

  protected post(path: string, data: unknown, options?: RequestOptions) {
    const url = this.buildUrl(path, options?.params);
    this.log('POST', url, data);
    return this.request.post(url, {
      headers: {
        ...this.defaultHeaders(),
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      data,
    });
  }

  protected put(path: string, data: unknown, options?: RequestOptions) {
    const url = this.buildUrl(path, options?.params);
    this.log('PUT', url, data);
    return this.request.put(url, {
      headers: {
        ...this.defaultHeaders(),
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      data,
    });
  }

  protected patch(path: string, data: unknown, options?: RequestOptions) {
    const url = this.buildUrl(path, options?.params);
    this.log('PATCH', url, data);
    return this.request.patch(url, {
      headers: {
        ...this.defaultHeaders(),
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      data,
    });
  }

  protected delete(path: string, options?: RequestOptions) {
    const url = this.buildUrl(path, options?.params);
    this.log('DELETE', url);
    return this.request.delete(url, {
      headers: { ...this.defaultHeaders(), ...options?.headers },
    });
  }

  async parseJson<T>(response: APIResponse): Promise<T> {
    return response.json() as Promise<T>;
  }

  async expectOk(response: APIResponse) {
    expect(response.ok(), `Expected OK response, got ${response.status()}`).toBeTruthy();
  }

  async expectStatus(response: APIResponse, status: number) {
    expect(response.status(), `Expected status ${status}`).toBe(status);
  }
}
