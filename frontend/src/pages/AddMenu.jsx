import React, { useState } from 'react';
import styles from '../assets/page_styles/AddMenu.module.css';
import { BASE_API } from '../constants';

const API_URL = `${BASE_API}/hotels/menu`;

function AddMenu() {
  // State variables to hold the form data
  const [hotelId, setHotelId] = useState(1);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState(1);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a JSON object with the form data
    const menuData = {
      hotel_id: hotelId,
      item_name: itemName,
      price: price,
    };

    try {
      // Send a POST request to your API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData),
      });

      if (response.ok) {
        // Successful response, you can handle it here
        console.log('Menu item added successfully!');
      } else {
        // Handle error responses here
        console.error('Failed to add menu item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Menu</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="hotelId">Hotel ID:</label>
          <input
            type="number"
            id="hotelId"
            value={hotelId}
            onChange={(e) => setHotelId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button}>
          Add Menu Item
        </button>
      </form>
    </div>
  );
}

export default AddMenu;
