import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import axiosRetry from "axios-retry";
import getConfig from "../config";

class AxiosService {
  private axiosInstance: AxiosInstance;
  private cancelTokenSource: CancelTokenSource;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: getConfig().apiBaseUrl,
      timeout: 10000, // 10 seconds
      headers: {
        "Content-Type": "application/json"
      }
    });

    axiosRetry(this.axiosInstance, {
      retries: 3,
      retryDelay: (retryCount) => retryCount * 1000,
      retryCondition: (error) =>
        axios.isAxiosError(error) && ((error?.response?.status && error?.response?.status >= 500) || !error.response)
    });

    this.cancelTokenSource = axios.CancelToken.source();

    // Request interceptor to add auth token from local storage
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
  }

  private handleSuccessResponse(response: AxiosResponse) {
    return response.data;
  }

  private handleErrorResponse(error: any) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      console.error("Request error", error);
      if (error.response && error.response.status === 403) {
        // localStorage.removeItem("authToken");
        // TODO: fix it once backend for this fixed
      } else if (error.response && error.response.status === 400) {
        console.error("Bad request", error.response.data);
      }
    }
    throw error;
  }

  public get<T = any>({ url, config }: { url: string; config?: AxiosRequestConfig }): Promise<T> {
    return this.axiosInstance.get(url, {
      ...config,
      cancelToken: this.cancelTokenSource.token
    });
  }

  public post<T = any>({ url, data, config }: { url: string; data?: any; config?: AxiosRequestConfig }): Promise<T> {
    return this.axiosInstance.post(url, data, {
      ...config,
      cancelToken: this.cancelTokenSource.token
    });
  }

  public put<T = any>({ url, data, config }: { url: string; data?: any; config?: AxiosRequestConfig }): Promise<T> {
    return this.axiosInstance.put(url, data, {
      ...config,
      cancelToken: this.cancelTokenSource.token
    });
  }

  public delete<T = any>({ url, config }: { url: string; config?: AxiosRequestConfig }): Promise<T> {
    return this.axiosInstance.delete(url, {
      ...config,
      cancelToken: this.cancelTokenSource.token
    });
  }

  public uploadFile<T = any>({
    url,
    formData,
    config
  }: {
    url: string;
    formData: FormData;
    config?: AxiosRequestConfig;
  }): Promise<T> {

    return this.axiosInstance.post(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      cancelToken: this.cancelTokenSource.token
    });
  }

  public setAuthorizationToken(token: string): void {
    localStorage.setItem("authToken", token);
    this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  public setDefaultHeaders(headers: Record<string, string>): void {
    this.axiosInstance.defaults.headers.common = {
      ...this.axiosInstance.defaults.headers.common,
      ...headers
    };
  }

  public cancelRequest(message?: string): void {
    this.cancelTokenSource.cancel(message);
    this.cancelTokenSource = axios.CancelToken.source();
  }
}

const api = new AxiosService();
export default api;
