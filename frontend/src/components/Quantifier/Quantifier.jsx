import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import ReactGA from 'react-ga4';

const Quantifier = ({
  removeProductCallback,
  handleUpdateQuantity,
  productId,
}) => {
  const [value, setValue] = useState(1);

  const reduce = () => {
    handleUpdateQuantity(productId, 'decrease');
    setValue((prevState) => {
      const updatedValue = prevState - 1;
      if (updatedValue === 0) {
        removeProductCallback(productId);
      }
      return updatedValue;
    });
    ReactGA.event({
      category: 'Button Clicked',
      action: 'Cart Item Quantity Reduced',
      label: 'Menu ID: ' + productId,
    });
  };

  const increase = () => {
    handleUpdateQuantity(productId, 'increase');
    setValue((prevState) => prevState + 1);
    ReactGA.event({
      category: 'Button Clicked',
      action: 'Cart Item Quantity Increased',
      label: 'Menu ID: ' + productId,
    });
  };

  return (
    <div className="flex items-center ml-8">
      <div className="flex items-center border rounded-md">
        <button
          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          onClick={reduce}
        >
          -
        </button>
        <span className="px-3 py-1 text-gray-800">{value}</span>
        <button
          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          onClick={increase}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantifier;
