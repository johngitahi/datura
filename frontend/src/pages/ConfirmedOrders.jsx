import React, { useState, useEffect } from 'react';
import ConfirmedOrdersTable from '../components/ConfirmedOrdersTable/ConfirmedOrdersTable';
import { BASE_API } from '../constants';

const BASE_URL = `${BASE_API}/orders/ConfirmedOrders`;

const ConfirmedOrders = () => {
  const [confirmedOrders, setConfirmedOrders] = useState([]);

  useEffect(() => {
    // Make an API request to fetch confirmed orders with order_items
    // Update the state with the response data
    // Replace this with your actual API call
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => setConfirmedOrders(data.confirmed_orders))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <ConfirmedOrdersTable confirmedOrders={confirmedOrders} />
    </div>
  );
};

export default ConfirmedOrders;
