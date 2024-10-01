'use client'

import { useEffect, type ReactNode } from 'react';

import {
  onlineManager,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { getQueryClient } from '@/utils/get-query-client';

import AxiosProvider from './axios-provider';

const ServiceProvider = ({ children }: { children: ReactNode }) => {

const queryClient = getQueryClient()
const isOnline = onlineManager.isOnline();

useEffect(() => {
  if (!isOnline) {
    console.log('isOnline', isOnline);
  }
}, [isOnline]);

  return (
    <QueryClientProvider client={queryClient}>
      <AxiosProvider token={undefined}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </AxiosProvider>
    </QueryClientProvider>
  );
};

export { ServiceProvider };
