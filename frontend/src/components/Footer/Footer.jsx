// Footer.js
import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUtensils,
  faBowlFood,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import LoginButton from '../LoginButton';

import styles from './Footer.module.css';

function Footer() {
  const [cart] = useLocalStorageState('cart', {});
  const productsCount = Object.keys(cart || {}).length;

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__links}>
        <Link to="/">
          <FontAwesomeIcon icon={faHouse} /> Home
        </Link>
        <Link to="/hotels">
          <FontAwesomeIcon icon={faUtensils} /> Hotels
        </Link>
        <Link to="/cart" className="relative inline-flex items-center">
          <FontAwesomeIcon
            icon={faBowlFood}
            className="text-lg text-gray-700"
          />
          <span className="ml-2 text-gray-700">Cart</span>

          {productsCount > 0 && (
            <span className="absolute -top-1 -right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {productsCount}
            </span>
          )}
        </Link>
        {/* add a good style above here for the productcount, probably a span element for it to look bien */}
        {/* <Link to="/profile">
          <FontAwesomeIcon icon={faUser} /> Profile
        </Link> */}
        {/* <LoginButton /> */}
      </div>
      {/* <p>&copy; <b>2023 zipT. All rights reserved.</b></p> removed as this is now the main navigation */}
    </footer>
  );
}

export default Footer;
