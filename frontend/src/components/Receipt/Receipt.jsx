import { React } from 'react';
import styles from './Receipt.module.scss';
import { delivFees } from '../../constants.js';
import { Receipt as ReceiptIcon } from 'lucide-react';

const Receipt = ({ subTotal, packagingPrice }) => {
  const totalPrice = subTotal + delivFees + packagingPrice;

  const ReceiptItem = ({ label, price, highlight = false }) => (
    <div
      className={`flex justify-between items-center py-2 ${highlight ? 'border-t border-gray-200 mt-2 pt-4' : ''}`}
    >
      <p className={`text-gray-600 ${highlight ? 'font-semibold' : ''}`}>
        {label}
      </p>
      <p
        className={`${highlight ? 'text-lg font-bold text-green-600' : 'text-gray-800'}`}
      >
        Kshs. {price.toFixed(2)}
      </p>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <ReceiptIcon className="w-6 h-6 text-gray-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
      </div>

      <ReceiptItem label="Subtotal" price={subTotal} />
      <ReceiptItem label="Delivery Fee" price={delivFees} />
      <ReceiptItem label="Packaging (per item)" price={packagingPrice} />
      <ReceiptItem label="Total" price={totalPrice} highlight={true} />
    </div>
  );
};

export default Receipt;
