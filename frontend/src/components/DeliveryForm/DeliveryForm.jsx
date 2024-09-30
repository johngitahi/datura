import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import { BASE_API } from '../../constants';

const API_URL = `${BASE_API}/orders`;
const SUCCESS_ORDER = `Congratulations! 🎉 Your order has been made. Complete payment on the prompt by entering your pin, and we'll call you to confirm delivery.`;

function DeliveryForm(props) {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState(null);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    const phoneNumber = event.target.value;
    const isValidFormat = /^254\d{9}$/.test(phoneNumber);
    setPhoneNumber(phoneNumber);
    setIsValid(isValidFormat);
  };

  const handleOrderNow = async () => {
    if (address && phoneNumber) {
      setIsLoading(true);
      try {
        const orderData = {
          order_data: props.order_data,
          total: props.total,
          address: address,
          phoneNumber: phoneNumber,
        };
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderData }),
        });
        const data = await response.json();

        if (data.msg === 'Payment was not initiated') {
          setResponseMessage('Payment could not be initiated');
          ReactGA.event({
            category: 'Button Clicked',
            action: 'Order Not Placed',
            label: 'Payment not initiated ' + phoneNumber,
          });
        } else {
          setResponseMessage(SUCCESS_ORDER);
          setOrderConfirmed(true);
          const deliveryTime = new Date(new Date().getTime() + 45 * 60000);
          setEstimatedDeliveryTime(deliveryTime);
          ReactGA.event({
            category: 'Button Clicked',
            action: 'Order Placed Successfully',
            label: 'User ' + phoneNumber,
          });
        }
      } catch (error) {
        console.error('Error placing order:', error);
        setResponseMessage('Error placing order. Please try again.');
        ReactGA.event({
          category: 'Button Clicked',
          action: 'Order Not Placed',
          label: 'Error placing order ' + phoneNumber,
        });
      }
      setIsLoading(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
        <p className="mb-4 text-green-600">{responseMessage}</p>
        <p className="mb-4">
          Estimated Delivery Time: {estimatedDeliveryTime.toLocaleTimeString()}
        </p>
        <h3 className="text-xl font-semibold mb-2">Order Details:</h3>
        <p className="mb-1">Delivery Address: {address}</p>
        <p className="mb-1">Phone Number: {phoneNumber}</p>
        <p className="mb-4">Total: {props.total}</p>
        <h3 className="text-xl font-semibold mb-2">Ordered Items:</h3>
        <ul className="list-disc pl-5">
          {props.order_data.map((item, index) => (
            <li key={index}>
              {item.item_name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Where should we deliver the food?"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />
      <div className="mb-4">
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="254XX M-Pesa Number"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            isValid ? 'border-green-500' : 'border-red-500'
          }`}
        />
        {!isValid && (
          <p className="text-red-500 text-xs italic">
            Starting with 254, 12 characters. Go!
          </p>
        )}
      </div>
      <button
        onClick={handleOrderNow}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isLoading ? 'Placing Order...' : 'Order Now'}
      </button>
      <p className="mt-4 text-red-500">{responseMessage}</p>
    </div>
  );
}

export default DeliveryForm;
