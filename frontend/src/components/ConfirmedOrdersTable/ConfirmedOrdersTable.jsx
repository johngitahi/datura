import React from 'react';
import styles from './ConfirmedOrdersTable.module.css';
import { BASE_API } from "../../constants";

function ConfirmedOrdersTable({ confirmedOrders }) {
  const hotels = {
    1: "Kiqwetu Hotel(Baraks)",
    2: "PG Swahili Dishes",
    3: "Farmers Hotel",
    4: "Kwa Festo",
    5: "Nifas Bakery", // add custom cake option
    6: "Kwa Customer",
  };

  const handleUpdateDeliveryStatus = (orderId) => {
    // Ask for confirmation before updating
    const confirmUpdate = window.confirm("Do you really want to update the delivery status?");
    
    if (confirmUpdate) {
      // Make a fetch request to update the delivery status
      fetch(`${BASE_API}/orders/UpdateDeliveryStatus/${orderId}`, {
        method: 'PUT',
      })
        .then((response) => {
          if (response.ok) {
            // if success
            console.log("successfully updated the order delivery status")
            // Show a success alert
            window.alert("Delivery status updated successfully!");
          } else {
            // show an error message
            console.error("Error updating delivery status");
            // Show an error alert
            window.alert("Error updating delivery status. Please try again.");
          }
        })
        .catch((error) => {
          // Handle network errors
          console.error("Network error:", error);
          // Show a network error alert
          window.alert("Network error. Please check your internet connection.");
        });
    }
  };

  return (
    <div>
      <h2>Confirmed Orders</h2>
      {confirmedOrders.length === 0 ? (
        <p>No new confirmed Orders</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Order ID</th>
              <th className={styles.th}>Delivery Location</th>
              <th className={styles.th}>Client Phone Number</th>
              <th className={styles.th}>Delivery Status</th>
              <th className={styles.th}>Order Items</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {confirmedOrders.map((orderWithItems, index) => (
              <tr key={index} className={index % 2 === 0 ? styles.trEven : ''}>
                <td className={styles.td}>{orderWithItems.order.order_id}</td>
                <td className={styles.td}>{orderWithItems.order.delivery_location}</td>
                <td className={styles.td}>{orderWithItems.order.customer_phone}</td>
                <td className={styles.td}>{orderWithItems.order.delivery_status}</td>
                <td className={styles.td}>
                  <ul>
                    {orderWithItems.order_items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item.quantity} X {item.item_name} from {hotels[item.hotel_id]}</li>
                    ))}
                  </ul>
                </td>
                <td className={styles.td}>
                  {orderWithItems.order.delivery_status === 'Null' && (
                    <button className={styles.updatebtn} onClick={() => handleUpdateDeliveryStatus(orderWithItems.order.order_id)}>
                      Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ConfirmedOrdersTable;
