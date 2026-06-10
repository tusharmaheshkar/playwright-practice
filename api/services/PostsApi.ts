import { BaseApiClient } from '../BaseApiClient';
import { CreatePostPayload, Post, PostSchema } from '../types/post';
import { validateResponse } from '../../utils/validateResponse';

export class PostsApi extends BaseApiClient {
  getAll() {
    return this.get('/posts');
  }

  getById(id: number) {
    return this.get(`/posts/${id}`);
  }

  create(payload: CreatePostPayload) {
    return this.post('/posts', payload);
  }

  update(id: number, payload: CreatePostPayload) {
    return this.put(`/posts/${id}`, payload);
  }

  remove(id: number) {
    return this.delete(`/posts/${id}`);
  }

  async getByIdValidated(id: number): Promise<Post> {
    const response = await this.getById(id);
    await this.expectOk(response);
    return validateResponse(PostSchema, await this.parseJson<unknown>(response));
  }
}
