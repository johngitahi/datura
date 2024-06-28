import useLocalStorageState from 'use-local-storage-state';
import { useEffect } from 'react';
import Quantifier from '../components/Quantifier/Quantifier';
// import { TotalPrice } from '../TotalPrice'
import classes from '../assets/page_styles/Cart.module.scss';
import { useLocation } from 'react-router-dom';
import DeliveryForm from '../components/DeliveryForm/DeliveryForm';
import Receipt from '../components/Receipt/Receipt';

const Cart = () => {

  const [cart, setCart] = useLocalStorageState('cart', {})
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const handleRemoveProduct = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart }
      delete updatedCart[productId]
      return updatedCart
    })
  }

  const handleUpdateQuantity = (productId, operation) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart }
      if (updatedCart[productId]) {
        if (operation === 'increase') {
          updatedCart[productId] = { ...updatedCart[productId], quantity: updatedCart[productId].quantity + 1 }
        } else {
          updatedCart[productId] = { ...updatedCart[productId], quantity: updatedCart[productId].quantity - 1 }
        }
      }
      return updatedCart
    })
  }


  const getProducts = () => Object.values(cart || {})

  const foodProductsWithNoContainerCharge = [27, 28, 35, 48]; // this line is very important
  
  const subTotal = getProducts().reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0)
  const delivFees = 50;
  
  // Calculate the food container charge conditionally
  const packagingPrice = getProducts().reduce((accumulator, product) => {
    if (!foodProductsWithNoContainerCharge.includes(product.menu_id)) {
      return accumulator + (product.quantity * 20);
    }
    return accumulator;
  }, 0);

  const totalPrice = subTotal + delivFees + packagingPrice;
  return (
    <section className={classes.cart}>
      <h1>Cart</h1>
      {(Object.keys(cart || {}).length <= 0) && <p>Empty Cart, add food then come back</p>}
      <div className={classes.container}>
        {getProducts().map(product => (
          <div className={classes.product} key={product.menu_id}>
            {/* <img src={product.thumbnail} alt={product.item_name} /> */}
            <h3>{product.item_name}</h3>
            <Quantifier
              removeProductCallback={() => handleRemoveProduct(product.menu_id)}
              productId={product.menu_id}
              handleUpdateQuantity={handleUpdateQuantity} />
          </div>
        ))}
      </div>
    {(Object.keys(cart || {}).length > 0) && <Receipt subTotal={subTotal} packagingPrice={packagingPrice}/> }
    {(Object.keys(cart || {}).length > 0) && <DeliveryForm order_data={getProducts()} total={totalPrice}/>}
    </section>
  )
}

export default Cart;
