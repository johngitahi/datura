import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { BASE_API } from '../constants';

const TodayOrders = () => {
  const [todayOrders, setTodayOrders] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchTodayOrders = async () => {
      try {
        const response = await fetch(`${BASE_API}/orders/today`);
        if (!response.ok) {
          throw new Error('Failed to fetch today\'s orders');
        }
        const data = await response.json();
        setTodayOrders(data);
      } catch (error) {
        console.error('Error fetching today\'s orders:', error);
      }
    };

    fetchTodayOrders();
  }, []);

  const totalRevenue = todayOrders.reduce((sum, order) => sum + order.order_total, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Today's Orders</h2>
        <ShoppingBag className="h-6 w-6 text-gray-400" />
      </div>
      <div className="text-3xl font-bold">{todayOrders.length}</div>
      <p className="text-sm text-gray-500 mb-4">Total Revenue: Kes.{totalRevenue.toFixed(2)}</p>
      
      <button 
        className="flex items-center text-blue-600 hover:text-blue-800"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Hide Details' : 'Show Details'}
        {isExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
      </button>

      {isExpanded && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todayOrders.map((order) => (
                <tr key={order.order_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.order_id.slice(-6)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Kes.{order.order_total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.order_status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.order_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.delivery_location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TodayOrders;
