import React from 'react'
import { MdOutlineShowChart } from "react-icons/md";

import styles from './navbar.module.css'
import ThemeToggle from '../../feature/theme-toggle'
import LanguageDropdown from '@/lib/feature/language-dropdown';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}><MdOutlineShowChart />Next Crypto</div>
      <ul className={styles.navLinks}>
        <li><ThemeToggle /></li>
        <li>
          <LanguageDropdown />
        </li>
      </ul>
      {/* <div className={styles.burger}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div> */}
    </nav>
  )
}

export default Navbar