import { unstable_setRequestLocale } from 'next-intl/server';

import Markets from "@/lib/routes/markets";

import styles from "./page.module.css";

const MarketsPage = ({params}: {params: {locale: string}}) => {

  unstable_setRequestLocale(params.locale);

  return (
    <div className={styles.container}>
      <Markets />
    </div>
  );
}

export default MarketsPage