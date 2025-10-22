import type { Method } from "axios";
import axiosInstance from "./axiosInstance";
import axios from "axios";


interface RequestParams<B = unknown> {
  endpoint: string;
  body?: B;
  method?: Method;
  isAuth?: boolean;
  params?: Record<string, any>;
  withCredentials?: boolean;
  timeout?: number; // in milliseconds
}

// interface IApiResponse<T> {
//   data: T;
//   message: string;
//   code: number;
// }

const handleAPI = async <T, B = unknown>({
  endpoint,
  body,
  method = "GET",
  isAuth = false,
  params,
  withCredentials = false,
  timeout
}: RequestParams<B>): Promise<T> => {
  try {
    const headers: Record<string, string> = {};

    if (isAuth) {
      //headers: { "X-Auth": "true" }
        headers["X-Auth"] = "true";
    }

    const axiosResponse = await axiosInstance({
      url: endpoint,
      method,
      data: body,
      headers,
      params,
      withCredentials: withCredentials,
      timeout: timeout || 10000
    });

    const data: T = axiosResponse.data;
    return data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || "An unexpected error occurred.");
    } else {
      throw new Error("An unexpected error occurred. 2");
    }
  }
};

export default handleAPI;
