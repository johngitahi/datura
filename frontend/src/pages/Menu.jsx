// src/pages/Menu.jsx
import React, { useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import styles from '../assets/page_styles/Menu.module.css';
import WLoader from '../components/Loader/Loader';
import { useParams, Link } from 'react-router-dom';
import AddToCartBtn from '../components/AddToCartBtn/AddToCartBtn';
import { BASE_API } from "../constants";

const API_URL = `${BASE_API}/hotels`;

const Menu = () => {
	const { hotelId } = useParams(); // Get the hotelId from route parameter
  	const [isLoading, setIsLoading] = useState(true);
	const [hotelName, setHotelName] = useState("");
  	const [menuItems, setMenuItems] = useState([]);
  	const [error, setError] = useState(false);
  	const [cart, setCart] = useLocalStorageState('cart', {});

	useEffect(() => {
		fetchData(`${API_URL}/${hotelId}/menu`);
	}, []);

	useEffect(() => {
		getHotelName(`${API_URL}/${hotelId}`);
	}, []);

	async function getHotelName(url) {
		try {
			const res = await fetch(url);
			if (res.ok) {
				const hotelData = await res.json();
				setHotelName(hotelData["name"]);
			}
		} catch(error) {
			setError(true);
		}
	}
	  
	async function fetchData(url) {
		try {
		  const response = await fetch(url);
		  if (response.ok) {
			const data = await response.json();
			// console.log(data.menuItems); motherfucker wasted my time!!! shit!! there exist no data.menuItems
			setIsLoading(false);
			setMenuItems(data);
		  } else {
			setError(true);
			setIsLoading(false);
		  }
		} catch (error) {
		  setError(true);
		  setIsLoading(false);
		}
	}
	  
	const addToCart = (menuItem) => {
		menuItem.quantity = 1;
	  
		setCart((prevCart) => ({
		  ...prevCart,
		  [menuItem.menu_id]: menuItem,
		}));
	};
	  
	const isInCart = (menuItemID) => Object.keys(cart || {}).includes(menuItemID.toString());
	
	return (
		<section className={styles.menuPage}>
		  <h3>{hotelName} Menu</h3>
		  {isLoading ? <WLoader /> : null}
		  <div className={styles.container}>
			{menuItems.map((menuItem) => (
			  <div className={styles.menuItem} key={menuItem.menu_id}>
				<img src={menuItem.thumbnail} alt={menuItem.title} />
				<h3>{menuItem.item_name}</h3>
				<p>
				  Price: {menuItem.price}
				</p>
				<AddToCartBtn
					menuItem={menuItem}
					addToCart={addToCart}
					isInCart={isInCart}
				/>
			  </div>
			))}
		  </div>
		</section>
	);
};

export default Menu;
