//utils
import { API_URL } from "@/configs/global";
import { useAuthStore } from "@/stores/auth";
import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
//hooks
import { useToast } from "vue-toastification";

const toast = useToast();

const httpService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    toast.error(error?.message);
  }
);
httpService.interceptors.request.use(function (config) {
  const authStore = useAuthStore();
  const token = authStore.token;
  config.headers.Authorization = `Token ${token}`;
  return config;
});

async function apiBase<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse = await httpService(url, options);
  return response.data as T;
}

async function readData<T>(
  url: string,
  params?: Object,
  headers?: AxiosRequestHeaders
): Promise<T> {
  const options: AxiosRequestConfig = {
    headers,
    method: "GET",
    params,
  };
  return await apiBase<T>(url, options);
}

async function postData<T, D>(
  url: string,
  data: T,
  headers?: AxiosRequestHeaders
): Promise<D> {
  const options: AxiosRequestConfig = {
    headers: headers,
    method: "POST",
    data: JSON.stringify(data),
  };
  return await apiBase<D>(url, options);
}

async function updateData<T, D>(
  url: string,
  data: T,
  headers?: AxiosRequestHeaders
): Promise<D> {
  const options: AxiosRequestConfig = {
    headers: headers,
    method: "PUT",
    data: JSON.stringify(data),
  };
  return apiBase<D>(url, options);
}

async function deleteData(
  url: string,
  headers?: AxiosRequestHeaders
): Promise<void> {
  const options: AxiosRequestConfig = {
    headers: headers,
    method: "DELETE",
  };
  return apiBase(url, options);
}
const http = { postData, readData, updateData, deleteData };

export default http;
