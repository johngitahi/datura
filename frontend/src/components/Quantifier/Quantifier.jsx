import { useState } from 'react';
import ReactGA from "react-ga4";
import classes from './Quantifier.module.css';

// export type Operation = 'decrease' | 'increase'

const Quantifier = ({ removeProductCallback, handleUpdateQuantity, productId }) => {
  const [value, setValue] = useState(1)

  const reduce = () => {
    handleUpdateQuantity(productId, 'decrease')

    setValue(prevState => {
      const updatedValue = prevState - 1
      if (updatedValue === 0) {
        removeProductCallback(productId)
      }
      return updatedValue
    })

    ReactGA.event({
      category: 'Button Clicked',
      action: 'Cart Item Quantity Reduced',
      label: 'Menu ID: ' + productId,
    });
  }

  const increase = () => {
    handleUpdateQuantity(productId, 'increase')
    setValue(prevState => prevState + 1)

    ReactGA.event({
      category: 'Button Clicked',
      action: 'Cart Item Quantity Increased',
      label: 'Menu ID: ' + productId,
    });
  }

  return (
    <div className={classes.quantifier}>
      <button onClick={reduce} className={classes.buttonMinus}>-</button>
      <span className={classes.quantityField}>{value}</span>
      <button onClick={increase} className={classes.buttonPlus}>+</button>
    </div>
  )
}

export default Quantifier;