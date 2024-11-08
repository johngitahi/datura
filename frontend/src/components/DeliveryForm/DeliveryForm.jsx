import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import { BASE_API } from '../../constants';

const API_URL = `${BASE_API}/orders`;
const SUCCESS_ORDER = `Congratulations! 🎉 Your order has been made. Complete payment on the M-Pesa prompt by entering your pin, and we'll call you to confirm delivery.`;

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
    let input = event.target.value;

    // Remove all non-digit characters
    input = input.replace(/\D/g, '');

    // Handle numbers starting with 0
    if (input.startsWith('0')) {
      input = input.substring(1);
    }

    // Handle numbers starting with 254
    if (input.startsWith('254')) {
      input = input.substring(3);
    }

    // Limit to 9 digits (Kenya mobile number length)
    input = input.slice(0, 9);

    // Validate that it starts with 7 or 1 (Kenya mobile number format)
    const isValidFormat = /^[7|1]\d{8}$/.test(input);

    // Store number without country code
    setPhoneNumber(input);
    setIsValid(isValidFormat);
  };

  const handleOrderNow = async () => {
    // Validate inputs before proceeding
    if (!address.trim()) {
      setResponseMessage('Please enter a delivery address');
      return;
    }

    if (!isValid || !phoneNumber) {
      setResponseMessage('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setResponseMessage(''); // Clear any previous messages

    try {
      const formattedPhoneNumber = `254${phoneNumber}`;
      const orderData = {
        order_data: props.order_data,
        total: props.total,
        address: address.trim(),
        phoneNumber: formattedPhoneNumber,
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      if (data.msg === 'Payment was not initiated') {
        setResponseMessage(
          "We couldn't connect to M-Pesa's payment system. This usually happens when " +
          "M-Pesa services are temporarily unavailable or experiencing delays. " +
          "Please wait a moment and try again. If you see this message repeatedly, " +
          "you can contact us for assistance."
        );
        ReactGA.event({
          category: 'Payment Failed',
          action: 'M-Pesa Connection Failed',
          label: `Payment initiation failed ${phoneNumber}`,
        });
      } else {
        setResponseMessage(SUCCESS_ORDER);
        setOrderConfirmed(true);
        const deliveryTime = new Date(new Date().getTime() + 45 * 60000);
        setEstimatedDeliveryTime(deliveryTime);
        ReactGA.event({
          category: 'Order Success',
          action: 'Payment Initiated',
          label: `Order confirmed ${phoneNumber}`,
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setResponseMessage(
        "We're having trouble processing your request. This might be due to " +
        "poor network connection or our server is temporarily unavailable. " +
        "Please check your internet connection and try again."
      );
      ReactGA.event({
        category: 'System Error',
        action: 'Order Processing Failed',
        label: `Server/Network error ${phoneNumber}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (orderConfirmed && estimatedDeliveryTime) {
    return (
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
        <p className="mb-4 text-green-600">{responseMessage}</p>
        <p className="mb-4">
          Estimated Delivery Time: {estimatedDeliveryTime.toLocaleTimeString()}
        </p>
        <h3 className="text-xl font-semibold mb-2">Order Details:</h3>
        <p className="mb-1">Delivery Address: {address}</p>
        <p className="mb-1">Phone Number: +254 {phoneNumber}</p>
        <p className="mb-4">Total: KES {props.total}</p>
        <h3 className="text-xl font-semibold mb-2">Ordered Items:</h3>
        <ul className="list-disc pl-5">
          {props.order_data.map((item, index) => (
            <li key={index} className="mb-2">
              {item.item_name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Delivery Address
        </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="Where should we deliver the food?"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone Number
        </label>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">+254</span>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="712345678"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              !isValid && phoneNumber ? 'border-red-500' : ''
            }`}
          />
        </div>
        {!isValid && phoneNumber && (
          <p className="text-red-500 text-sm mt-1">
            Please enter a valid Kenyan phone number (e.g., 712345678)
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleOrderNow}
          disabled={isLoading}
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Processing Order...' : 'Order Now'}
        </button>
      </div>

      {responseMessage && (
        <p className={`mt-4 text-sm ${
          responseMessage === SUCCESS_ORDER ? 'text-green-600' : 'text-red-500'
        }`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
}

export default DeliveryForm;