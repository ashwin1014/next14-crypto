// import { useTranslations } from 'next-intl';

// import { ContractType } from '@/types/products';
// import { useProductsTickerQuery } from '@/service';
// import { SearchBar, Text } from '@/lib';
import { unstable_setRequestLocale } from 'next-intl/server';

import Markets from "@/lib/routes/markets";

import styles from "./page.module.css";

const MarketsPage = ({params}: {params: {locale: string}}) => {

  unstable_setRequestLocale(params.locale);
  // const t = useTranslations('IndexPage');

  // const { isLoading, data } = useProductsTickerQuery({
  //   contractType: `${ContractType.PERPETUAL_FUTURES},${ContractType.FUTURES}`,
  //   pollApi: true,
  // });

  // const [, startTransition] = useTransition();
  // const [search, setSearch] = useState('');

  // const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
  //   startTransition(() => {
  //     setSearch(e.target.value);
  //   });
  // }

  // const handleClearSearch = () => {
  //   setSearch('');
  // }

  // const filteredData = useMemo(() => {
  //   return data?.result.filter(item =>
  //     item.symbol.toLowerCase().includes(search.toLowerCase())
  //   );
  // }, [data, search]);

  return (
    <div className={styles.container}>
      <Markets />
      {/* {
        isLoading ? <div>Loading...</div> : (
          <>
            <SearchBar value={search} onChange={handleSearch} onClear={handleClearSearch} placeholder='Search by symbol' />
            {
              filteredData?.length ? <MarketsTable data={filteredData} /> : <Text>{t('noResultsFound')}</Text>
            }
          </>
        )
      } */}
    </div>
  );
}

export default MarketsPage