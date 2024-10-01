'use client'

import React, { ChangeEvent, useMemo, useState, useTransition } from 'react';

import dynamic from 'next/dynamic'

import { ContractType } from '@/types/products';
import { useProductsTickerQuery } from '@/service';
import { SearchBar, Text } from '@/lib';

import styles from "./page.module.css";

const MarketsTable = dynamic(() => import('@/lib/feature/markets-table/markets-table'), {
  ssr: false,
})

const MarketsPage = () => {

  const { isLoading, data } = useProductsTickerQuery({
    contractType: `${ContractType.PERPETUAL_FUTURES},${ContractType.FUTURES}`,
    pollApi: true,
  });

  const [, startTransition] = useTransition();
  const [search, setSearch] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearch(e.target.value);
    });
  }

  const handleClearSearch = () => {
    setSearch('');
  }

  const filteredData = useMemo(() => {
    return data?.result.filter(item =>
      item.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  return (
    <div className={styles.container}>
      {
        isLoading ? <div>Loading...</div> : (
          <>
            <SearchBar value={search} onChange={handleSearch} onClear={handleClearSearch} placeholder='Search by symbol' />
            {
              filteredData?.length ? <MarketsTable data={filteredData} /> : <Text>No results found for {search}</Text>
            }
          </>
        )
      }
    </div>
  );
}

export default MarketsPage