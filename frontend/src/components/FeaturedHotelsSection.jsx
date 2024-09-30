import React, { useState, useEffect } from 'react';
import HotelCard from './HotelCard/HotelCard';
import { BASE_API } from '../constants';
import { mockHotels } from '../mockHotels.js';
import fetchHotels from '../fetchHotels';

function FeaturedHotelsSection() {
  const [featuredHotels, setFeaturedHotels] = useState([]);

  useEffect(() => {
    // Fetch data (mock in development, real API in production)
    fetchHotels()
      .then((data) => {
        // Update state with the fetched data
        setFeaturedHotels(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <section id="featured-hotels" className="featured-hotels">
      {/* Featured hotel cards with images and descriptions */}
      {featuredHotels.map((hotel, index) => (
        <HotelCard
          key={index}
          id={hotel.hotel_id}
          name={hotel.name}
          location={hotel.location}
          logo_url={hotel.logo_url}
        />
      ))}
    </section>
  );
}

export default FeaturedHotelsSection;
