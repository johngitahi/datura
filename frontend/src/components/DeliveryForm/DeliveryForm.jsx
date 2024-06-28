import React, { useState } from "react";
import ReactGA from "react-ga4";
import styles from "./DeliveryForm.module.scss";
import { BASE_API } from "../../constants";

const API_URL = `${BASE_API}/orders`;
const SUCCESS_ORDER = `Congratulations! 🎉 Your order has been made. Complete payment on the prompt by entering your pin, and we'll call you to confirm delivery.`;

function DeliveryForm(props) {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    const phoneNumber = event.target.value;

    const isValidFormat = /^254\d{9}$/.test(phoneNumber);

    setPhoneNumber(phoneNumber);
    setIsValid(isValidFormat);
  };

  const handleOrderNow = async () => {
    if (address && phoneNumber) {
      setIsLoading(true);

      try {
        // order placement logic and API call
        const orderData = {
          order_data: props.order_data,
          total: props.total,
          address: address,
          phoneNumber: phoneNumber,
        };

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderData }),
        });

        const data = await response.json();

        // setResponseMessage(SUCCESS_ORDER);
        // console.log(data);
        if (data.msg === "Payment was not initiated") {
          setResponseMessage("Payment could not be initiated");
          ReactGA.event({
            category: 'Button Clicked',
            action: 'Order Not Placed',
            label: 'Payment not initiated '+ phoneNumber,
         });
        } else {
          setResponseMessage(SUCCESS_ORDER);
    		  ReactGA.event({
    			  category: 'Button Clicked',
    		    action: 'Order Placed Successfully',
    			  label: 'User '+ phoneNumber,
    		 });
        }
      } catch (error) {
        console.error("Error placing order:", error);
        setResponseMessage(data.msg);
        ReactGA.event({
            category: 'Button Clicked',
            action: 'Order Not Placed',
            label: 'Error placing order '+ phoneNumber,
         });
      }

      setIsLoading(false);
    }
  };

  return (
    <div className={styles.delivery__form}>
      {/* <label htmlFor="addressInput">Delivery Address:</label> */}
      <input
        type="text"
        id="addressInput"
        value={address}
        onChange={handleAddressChange}
        placeholder="Where should we deliver the food?"
      />
      {/* <label htmlFor="phoneNumberInput">M-Pesa Phone Number:</label> */}
      <div className={styles.phoneNumber}>
        <input
          type="text"
          id="phoneNumberInput"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="254XX M-Pesa Number"
          style={{ border: isValid ? "1px solid green" : "1px solid red" }}
        />
        {!isValid && (
          <p style={{ color: "red" }}>Starting with 254, 12 characters. Go!</p>
        )}
      </div>
      <button onClick={handleOrderNow} disabled={isLoading}>
        {isLoading ? "Placing Order..." : "Order Now"}
      </button>
      <p>{responseMessage}</p>
    </div>
  );
}

export default DeliveryForm;
