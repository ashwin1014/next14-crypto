import { useTranslations } from 'next-intl';

import Text from '@/lib/ui/text/text';
import { TickerProduct } from '@/types/products';
import millify from 'millify';

import styles from './markets-table.module.css';


const MarketsTableMobile = ({ data }: { data?: TickerProduct[] }) => {
    const t = useTranslations('IndexPage');
    return (
        <div className={styles.mobileTable}>
            <header className={styles.mobileTableHeader}>
                <div className={styles.mobileTableHeaderItem}>
                    <Text align='left' as='h2'>{t('mobileTable.contract')}</Text>
                </div>
                <div className={styles.mobileTableHeaderItem}>
                    <Text align='right' as='h2'>{t('mobileTable.priceVolume')}</Text>
                </div>
                <div className={styles.mobileTableHeaderItem}>
                    <Text align='right' as='h2'>{t('mobileTable.change')}</Text>
                </div>
            </header>
            {
                data?.map((item) => (
                    <div key={item.product_id} className={styles.mobileTableBodyWrapper}>
                        <div className={styles.mobileTableBodyItem}>
                            <Text align='left' size='small'>{item.symbol}</Text>
                            <Text align='left' size='xsmall'>{item.description}</Text>
                        </div>
                        <div className={styles.mobileTableBodyItem}>
                            <Text align='right' size='small'>{item?.close ? millify(Number(item.close), { precision: 2 }) : '-'}</Text>
                            <Text align='right' size='xsmall'>{item?.turnover_usd}</Text>
                        </div>
                        <div className={styles.mobileTableBodyItem}>
                            <Text align='right' size='small' color={Number(item.mark_change_24h) > 0 ? 'success' : 'error'}>{item?.mark_change_24h ? millify(Number(item.mark_change_24h), { precision: 2 }) : '-'}</Text>
                        </div>
                  </div>
                ))
            }
        </div>
    )
}

export default MarketsTableMobile;