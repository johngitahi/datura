import React from 'react';
import styles from './ConfirmedOrdersTable.module.css';
import { BASE_API } from '../../constants';

function ConfirmedOrdersTable({ confirmedOrders }) {
  const hotels = {
    1: 'Kwa Festo',
    2: 'Kiqwetu Hotel(Baraks)',
    3: 'Lelan Hotel',
    4: 'Summit Hotel',
    5: 'Zipt Groceries', // add custom cake option
    6: 'Chebiis Hotel',
    7: 'Kwa Customer',
    8: 'Lexys Hotel',
  };

  const handleUpdateDeliveryStatus = (orderId) => {
    // Ask for confirmation before updating
    const confirmUpdate = window.confirm(
      'Do you really want to update the delivery status?'
    );

    if (confirmUpdate) {
      // Make a fetch request to update the delivery status
      fetch(`${BASE_API}/orders/UpdateDeliveryStatus/${orderId}`, {
        method: 'PUT',
      })
        .then((response) => {
          if (response.ok) {
            // if success
            console.log('successfully updated the order delivery status');
            // Show a success alert
            window.alert('Delivery status updated successfully!');
          } else {
            // show an error message
            console.error('Error updating delivery status');
            // Show an error alert
            window.alert('Error updating delivery status. Please try again.');
          }
        })
        .catch((error) => {
          // Handle network errors
          console.error('Network error:', error);
          // Show a network error alert
          window.alert('Network error. Please check your internet connection.');
        });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Confirmed Orders
      </h2>
      {confirmedOrders.length === 0 ? (
        <p className="text-gray-600 italic">No new confirmed Orders</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {confirmedOrders.map((orderWithItems, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {orderWithItems.order.order_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {orderWithItems.order.delivery_location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {orderWithItems.order.customer_phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {orderWithItems.order.delivery_status}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <ul className="list-disc list-inside">
                      {orderWithItems.order_items.map((item, itemIndex) => (
                        <li key={itemIndex} className="mb-1">
                          {item.quantity} X {item.item_name} from{' '}
                          {hotels[item.hotel_id]}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {orderWithItems.order.delivery_status === 'Null' && (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                        onClick={() =>
                          handleUpdateDeliveryStatus(
                            orderWithItems.order.order_id
                          )
                        }
                      >
                        Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ConfirmedOrdersTable;
