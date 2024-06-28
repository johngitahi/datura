// Header.js

import React from 'react';
import styles from './Header.module.css';
import Navbar from '../Navbar/Navbar';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>zipT</div>
      <Navbar />
    </header>
  );
}

export default Header;
