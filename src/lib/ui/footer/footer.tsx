import { useTranslations } from 'next-intl';
import styles from './footer.module.css';

const Footer = () => {
  const t = useTranslations('IndexPage');
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerSection}>
        <p>&copy; 2024 Next Crypto</p>
      </div>
      <div className={styles.footerSection}>
        <p>
          <a href="/privacy-policy" style={{ color: 'inherit' }}>{t('privacyPolicy')}</a>
        </p>
      </div>
      <div className={styles.footerSection}>
        <p>
          <a href="/terms-of-service" style={{ color: 'inherit' }}>{t('termsOfService')}</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;