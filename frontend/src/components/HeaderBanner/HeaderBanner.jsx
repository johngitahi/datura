import React from 'react';
import styles from './HeaderBanner.module.css';

function HeaderBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.textCarousel}>
        <p>
          From 8 AM to 9 PM - No need to cook, just place an order and we
          deliver it to you. Quick and fast.
        </p>
      </div>
    </div>
  );
}

export default HeaderBanner;
