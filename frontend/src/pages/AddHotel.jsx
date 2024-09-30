import React, { useState } from 'react';
import styles from '../assets/page_styles/AddHotel.module.css'; // Import the CSS Module
import { BASE_API } from '../constants';

const API_URL = `${BASE_API}/hotels`;

function AddHotel() {
  const [hotel, setHotel] = useState({
    name: '',
    location: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setHotel({ ...hotel, image: imageFile });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // to avoid sending multiple requests using same data

    const formData = new FormData();
    formData.append('name', hotel.name);
    formData.append('location', hotel.location);
    formData.append('phone', hotel.phone);
    formData.append('image', hotel.image);

    fetch(API_URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Hotel added successfully:', data);
      })
      .catch((error) => {
        console.error('Error adding hotel:', error);
      });
  };

  return (
    <div className={styles.formContainer}>
      {' '}
      {/* Use the CSS Module class */}
      <h2>Add a Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={hotel.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Location:</label>
          <input
            type="text"
            name="location"
            value={hotel.location}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Phone:</label>
          <input
            type="text"
            name="phone"
            value={hotel.phone}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Image:</label>
          <input
            type="file"
            accept="image/*" // Allow only image files
            onChange={handleImageChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Add Hotel
        </button>
      </form>
    </div>
  );
}

export default AddHotel;
