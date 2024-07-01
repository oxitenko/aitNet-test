import { IHttpClient } from './IHttpClient';

export class ApiService {
  constructor(private httpClient: IHttpClient) {}

  async fetchData(
    endpoint: string,
    params?: Record<string, unknown>,
  ): Promise<string> {
    return this.httpClient.get<string>(endpoint, params);
  }
}
