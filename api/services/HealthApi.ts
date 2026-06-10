import { BaseApiClient } from '../BaseApiClient';
import { env } from '../../config/env';

export class HealthApi extends BaseApiClient {
  check() {
    return this.get(env.apiHealthPath);
  }
}
