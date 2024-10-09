import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, Clock, X } from 'lucide-react';
import { BASE_API } from '../constants';

const AllOrdersToday = () => {
  const [allOrdersToday, setAllOrdersToday] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchAllOrdersToday = async () => {
      try {
        const response = await fetch(`${BASE_API}/orders/alltoday`);
        if (!response.ok) {
          throw new Error('Failed to fetch all orders for today');
        }
        const data = await response.json();
        setAllOrdersToday(data);
      } catch (error) {
        console.error('Error fetching all orders for today:', error);
      }
    };

    fetchAllOrdersToday();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <X className="h-5 w-5 text-red-500" />;
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">All Orders Today</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allOrdersToday.map((order) => (
              <React.Fragment key={order.order_id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.order_id.slice(-6)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Kes.{order.order_total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center">
                      {getStatusIcon(order.order_status)}
                      <span className="ml-2 text-sm text-gray-500">{order.order_status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.created_at)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleOrderExpansion(order.order_id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {expandedOrder === order.order_id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                      <span className="sr-only">
                        {expandedOrder === order.order_id ? 'Hide Details' : 'Show Details'}
                      </span>
                    </button>
                  </td>
                </tr>
                {expandedOrder === order.order_id && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Delivery Location</p>
                          <p className="mt-1 text-sm text-gray-900">{order.delivery_location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Customer Phone</p>
                          <p className="mt-1 text-sm text-gray-900">{order.customer_phone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Delivery Status</p>
                          <p className="mt-1 text-sm text-gray-900">{order.delivery_status}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Delivered At</p>
                          <p className="mt-1 text-sm text-gray-900">{formatDate(order.delivered_at)}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrdersToday;
