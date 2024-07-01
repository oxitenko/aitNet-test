import axios, { AxiosRequestConfig } from 'axios';
import { IHttpClient } from './IHttpClient';

export class AxiosHttpClient implements IHttpClient {
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const config: AxiosRequestConfig = {
      params,
      responseType: 'text',
    };
    const response = await axios.get<T>(url, config);
    return response.data;
  }
}
