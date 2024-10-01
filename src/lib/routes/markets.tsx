'use client'

import React, { ChangeEvent, useMemo, useState, useTransition } from 'react'

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic'

import { useProductsTickerQuery } from '@/service';
import { ContractType } from '@/types/products';
import { Text, SearchBar } from '@/lib';
import { useWindowSize } from '@/hooks';

const MarketsTable = dynamic(() => import('@/lib/feature/markets-table/markets-table'), {
    ssr: false,
  })

  const MarketsTableMobile = dynamic(() => import('@/lib/feature/markets-table/markets-table-mobile'), {
    ssr: false,
  })

const Markets = () => {

 const t = useTranslations('IndexPage');

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

  const { isMobile } = useWindowSize();

  return (
    <>
      {
        isLoading ? <Text align='center' as='h3'>Loading...</Text> : (
          <>
            <SearchBar value={search} onChange={handleSearch} onClear={handleClearSearch} placeholder={t('searchBySymbol')} />
            {
              filteredData?.length ? (
                !isMobile ? <MarketsTable data={filteredData} /> : <MarketsTableMobile data={filteredData} />
              ) : <Text align='center'>{t('noResultsFound')} <strong>&quot;{search}&quot;</strong></Text>
            }
          </>
        )
      }
    </>
  )
}

export default Markets;