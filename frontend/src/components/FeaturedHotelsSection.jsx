import React, { useState, useEffect } from 'react';
import HotelCard from "./HotelCard/HotelCard"
import { BASE_API } from '../constants';

const API_URL = `${BASE_API}/hotels`;

function FeaturedHotelsSection() {
    const [featuredHotels, setFeaturedHotels] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                // Update state with the fetched data
                setFeaturedHotels(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <section id="featured-restaurants" className="featured-restaurants">
            {/* Featured hotel cards with images and descriptions */}
            {featuredHotels.map((hotel, index) => (
                <HotelCard
                    key={index}
                    id={hotel.hotel_id}
                    name={hotel.name}
                    imageSrc={hotel.logo_url}
                    description={hotel.description}
                />
            ))}
        </section>
    );
}

export default FeaturedHotelsSection;