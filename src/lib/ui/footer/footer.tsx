import styles from './footer.module.css';

const Footer = () => {

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerSection}>
        <p>&copy; 2024 Next Crypto</p>
      </div>
      <div className={styles.footerSection}>
        <p>
          <a href="/privacy-policy" style={{ color: 'inherit' }}>Privacy Policy</a>
        </p>
      </div>
      <div className={styles.footerSection}>
        <p>
          <a href="/terms-of-service" style={{ color: 'inherit' }}>Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;