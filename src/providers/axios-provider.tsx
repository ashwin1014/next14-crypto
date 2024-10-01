'use client'

import { type ReactNode, createContext, useContext, useMemo } from 'react';

import Axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

import { BASE_URL } from '@/constants';
import { isEmpty } from '@/utils/common';

const AxiosContext = createContext<AxiosInstance>(Axios.create({}));

// Abstracted interceptor logic for requests
const configureRequestInterceptor = (axiosInstance: AxiosInstance, token?: string) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (!isEmpty(token)) {
        config.headers.Authorization = token;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );
};

// Abstracted interceptor logic for responses
const configureResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const errorObject = {
        error: error.response?.data,
        status: error.response?.status,
      };
      return Promise.reject(errorObject);
    },
  );
};

function axios() {
  return Axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  });
}

const AxiosProvider = ({
  token,
  children,
}: {
  children: ReactNode;
  token?: string;
}) => {
  const axiosInstance: AxiosInstance = useMemo(() => {
    const getAxiosInstance = axios();

    // Apply interceptors
    configureRequestInterceptor(getAxiosInstance, token);
    configureResponseInterceptor(getAxiosInstance);

    return getAxiosInstance;
  }, [token]);

  return <AxiosContext.Provider value={axiosInstance}>{children}</AxiosContext.Provider>;
};

function useAxios() {
  const axiosInstance = useContext(AxiosContext);

  if (!axiosInstance) {
    throw new Error('useAxios must be used within an AxiosProvider');
  }

  return axiosInstance;
}

export type { AxiosResponse };
export { useAxios };
export type { AxiosError };
export default AxiosProvider;
