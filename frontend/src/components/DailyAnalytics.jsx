import React, { useState, useEffect } from 'react';
import { ShoppingCart, DollarSign, CheckCircle } from 'lucide-react';
import { BASE_API } from '../constants';

const DailyAnalytics = () => {
  const [dayAnalytics, setDayAnalytics] = useState(null);

  useEffect(() => {
    const fetchDayAnalytics = async () => {
      try {
        const response = await fetch(`${BASE_API}/orders/dayanalytics`);
        if (!response.ok) {
          throw new Error('Failed to fetch day analytics');
        }
        const data = await response.json();
        setDayAnalytics(data);
      } catch (error) {
        console.error('Error fetching day analytics:', error);
      }
    };

    fetchDayAnalytics();
  }, []);

  if (!dayAnalytics) {
    return <div className="bg-white rounded-lg shadow p-6">Loading daily analytics...</div>;
  }

  const confirmationRate = (dayAnalytics.confirmed_orders_today / dayAnalytics.total_orders_today) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Today's Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-800">Total Orders</h3>
            <ShoppingCart className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-900">{dayAnalytics.total_orders_today}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-green-800">Confirmed Orders</h3>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-900">{dayAnalytics.confirmed_orders_today}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-purple-800">Total Transactions</h3>
            <DollarSign className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-900">Kes.{dayAnalytics.total_transactions_today.toFixed(2)}</p>
        </div>
	<div className="bg-purple-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-purple-800">Total Orders Revenue</h3>
            <DollarSign className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-900">Kes.{dayAnalytics.total_revenue_today.toFixed(2)}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Order Confirmation Rate</h3>
        <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
          <div 
            className="bg-green-500 h-full rounded-full" 
            style={{ width: `${confirmationRate}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {confirmationRate.toFixed(1)}% of orders confirmed
        </p>
      </div>
    </div>
  );
};

export default DailyAnalytics;
