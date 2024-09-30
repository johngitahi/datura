// src/pages/Menu.jsx
import React, { useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import styles from '../assets/page_styles/Menu.module.css';
import WLoader from '../components/Loader/Loader';
import { useParams, Link } from 'react-router-dom';
import AddToCartBtn from '../components/AddToCartBtn/AddToCartBtn';
import { BASE_API } from '../constants';
import { mockMenu } from '../mockHotels';
import MenuItemCard from '../components/MenuItemCard';

const API_URL = `${BASE_API}/hotels`;

const Menu = () => {
  const { hotelId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hotelName, setHotelName] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useLocalStorageState('cart', {});

  useEffect(() => {
    const fetchHotelAndMenu = async () => {
      try {
        // Check if in development environment to use mock data
        if (import.meta.env.VITE_ENV === 'development') {
          // Use mock data in development
          setHotelName('Test Hotel');
          setMenuItems(mockMenu);
        } else {
          // Use real API in production
          const [hotelData, menuData] = await Promise.all([
            fetch(`${API_URL}/${hotelId}`).then((res) => res.json()),
            fetch(`${API_URL}/${hotelId}/menu`).then((res) => res.json()),
          ]);
          setHotelName(hotelData.name);
          setMenuItems(menuData);
        }
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchHotelAndMenu();
  }, [hotelId]);

  const addToCart = (menuItem) => {
    setCart((prevCart) => ({
      ...prevCart,
      [menuItem.menu_id]: { ...menuItem, quantity: 1 },
    }));
  };

  const removeFromCart = (menuItemId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[menuItemId];
      return newCart;
    });
  };
  const isInCart = (menuItemID) =>
    Object.keys(cart || {}).includes(menuItemID.toString());

  
  if (isLoading) return <WLoader />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {hotelName} Menu
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((menuItem) => (
          <MenuItemCard
            key={menuItem.menu_id}
            menuItem={menuItem}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            isInCart={isInCart}
          />
        ))}
      </div>
    </section>
  );
};

export default Menu;
