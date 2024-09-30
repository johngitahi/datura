import React from 'react';
import ReactGA from 'react-ga4';
import styles from './AddToCartBtn.module.css';

const AddToCartBtn = ({ menuItem, addToCart, isInCart }) => {
  const handleButtonClick = () => {
    // Track the button click event
    ReactGA.event({
      category: 'Button Click',
      action: 'Add to Cart Btn Clicked',
      label: 'Menu Item ID: ' + menuItem.menu_id,
    });

    // Perform your addToCart logic here
    addToCart(menuItem);
  };

  return (
    <div>
      <button
        disabled={isInCart(menuItem.menu_id)}
        onClick={handleButtonClick}
        className={styles.addToCartButton}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartBtn;
