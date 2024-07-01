export interface IHttpClient {
  get<T>(url: string, params?: Record<string, unknown>): Promise<T>;
}
