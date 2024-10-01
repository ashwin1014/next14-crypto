import { useCallback } from 'react';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { ContractType, TickerProductsResponse } from '@/types/products';
import { useAxios } from '@/providers/axios-provider';
import { CACHE_KEYS, ENDPOINTS } from '@/constants';


interface ProductsTickerRedactedQuery {
  contractType: ContractType | string;
  filter?: { settlement_time?: string } | { settlement_time?: string[] };
  pollApi: boolean;
}


/**
 * List of live tickers products data for given contract types.
 *
 * @param {ContractType} contractType -
 * Fetches ticker data for given contract type.
 *
 */
function useProductsTickerQuery({
  contractType,
  filter,
  pollApi,
}: ProductsTickerRedactedQuery) {
  const axios = useAxios();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = {
    contract_types: contractType,
    redacted: true,
    ...filter,
  };

  const fetchTicker = useCallback(
    async (signal: AbortSignal | undefined): Promise<TickerProductsResponse> => {
      const { data } = await axios.get<TickerProductsResponse>(ENDPOINTS.PRODUCTS_TICKER, {
        params,
        signal,
      });
      return data;
    },
    [axios, params],
  );

  return useQuery<TickerProductsResponse, Error, TickerProductsResponse>({
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => fetchTicker(signal),
    queryKey: [CACHE_KEYS.PRODUCTS_TICKER, contractType, filter?.settlement_time],
    refetchInterval: pollApi ? 3000 : undefined,
    refetchOnWindowFocus: true,
  });
}

export { useProductsTickerQuery };
