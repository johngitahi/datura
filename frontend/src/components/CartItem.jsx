import React from 'react';
import { Trash2 } from 'lucide-react';
import Quantifier from '../components/Quantifier/Quantifier';

const CartItem = ({ product, handleRemoveProduct, handleUpdateQuantity }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center flex-1">
        {/*
        <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex-shrink-0">
          {/* Placeholder for product image */}
        {/*<img src={product.thumbnail} alt={product.item_name} className="w-full h-full object-cover rounded-md" />*/}
        {/* </div> */}
        <div>
          <h3 className="font-semibold text-gray-800">{product.item_name}</h3>
          <p className="text-sm text-gray-500">
            Kshs. {product.price.toFixed(0)}
          </p>
        </div>
        <div className="my-8">
          <Quantifier
            removeProductCallback={() => handleRemoveProduct(product.menu_id)}
            productId={product.menu_id}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
