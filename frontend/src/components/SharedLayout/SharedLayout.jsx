// src/components/SharedLayout/SharedLayout.jsx

import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <div>
      <Header />
      <div className={styles.main_content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default SharedLayout;
