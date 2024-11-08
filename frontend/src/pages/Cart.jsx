import useLocalStorageState from 'use-local-storage-state';
import { useEffect } from 'react';
import Quantifier from '../components/Quantifier/Quantifier';
// import { TotalPrice } from '../TotalPrice'
import classes from '../assets/page_styles/Cart.module.scss';
import { useLocation } from 'react-router-dom';
import DeliveryForm from '../components/DeliveryForm/DeliveryForm';
import Receipt from '../components/Receipt/Receipt';
import { delivFees } from '../constants.js';
import CartItem from '../components/CartItem';

const Cart = () => {
  const [cart, setCart] = useLocalStorageState('cart', {});
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleRemoveProduct = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  const handleUpdateQuantity = (productId, operation) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        if (operation === 'increase') {
          updatedCart[productId] = {
            ...updatedCart[productId],
            quantity: updatedCart[productId].quantity + 1,
          };
        } else {
          updatedCart[productId] = {
            ...updatedCart[productId],
            quantity: updatedCart[productId].quantity - 1,
          };
        }
      }
      return updatedCart;
    });
  };

  const getProducts = () => Object.values(cart || {});

  const foodProductsWithNoContainerCharge = [
    1, 17, 18, 19, 20, 25, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 50, 51, 59,
    74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 105, 106, 107, 108,
      109, 110, 136, 137, 138, 142, 141, 140, 139, 143
  ]; // this line is very important

  const subTotal = getProducts().reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );

  // Calculate the food container charge conditionally
  const packagingPrice = getProducts().reduce((accumulator, product) => {
    if (!foodProductsWithNoContainerCharge.includes(product.menu_id)) {
      return accumulator + product.quantity * 20;
    }
    return accumulator;
  }, 0);

  const totalPrice = subTotal + delivFees + packagingPrice;
  return (
    <section className={classes.cart}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
        </div>
        {Object.keys(cart || {}).length <= 0 && (
          <p className="p-4 text-gray-500 text-center">Your cart is empty</p>
        )}
        <div className="divide-y divide-gray-200">
          {getProducts().map((product) => (
            <CartItem
              key={product.menu_id}
              product={product}
              handleRemoveProduct={handleRemoveProduct}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>
      </div>

      {Object.keys(cart || {}).length > 0 && (
        <Receipt subTotal={subTotal} packagingPrice={packagingPrice} />
      )}
      {Object.keys(cart || {}).length > 0 && (
        <DeliveryForm order_data={getProducts()} total={totalPrice} />
      )}
    </section>
  );
};

export default Cart;
