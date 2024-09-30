import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ id, name, location, logo_url }) => {
  return (
    <Link
      to={`/hotels/${id}`}
      className="block max-w-xs rounded-lg overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105 m-4"
    >
      <img
        className="w-full h-32 sm:h-48 object-cover"
        src={logo_url}
        alt={`${name} logo`}
      />
      <div className="p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          {name}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">{location}</p>
      </div>
    </Link>
  );
};

export default HotelCard;
