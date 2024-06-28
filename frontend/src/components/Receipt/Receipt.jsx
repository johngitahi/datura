import { React } from 'react';
import styles from "./Receipt.module.scss";

function Receipt(props) {
	const delivFees = 50;
	const packagingPrice = props.packagingPrice;
	const totalPrice = props.subTotal + delivFees + packagingPrice;

	return (
		<div className={styles.receipt}>
    		<div className={styles.receipt__item}>
    		  <p className={styles.receipt__text}>Subtotal</p>
    		  <p className={styles.receipt__price}>Kshs. {props.subTotal}</p>
    		</div>

    		<div className={styles.receipt__item}>
    		  <p className={styles.receipt__text}>Delivery Fee</p>
    		  <p className={styles.receipt__price}>Kshs. {delivFees}</p>
    		</div>

			<div className={styles.receipt__item}>
    		  <p className={styles.receipt__text}>Packaging(per item)</p>
    		  <p className={styles.receipt__price}>Kshs. {packagingPrice}</p>
    		</div>

    		<div className={styles.receipt__item}>
    		  <p className={styles.receipt__text}>Total</p>
    		  <p className={styles.receipt__price}>Kshs. {totalPrice}</p>
    		</div>
		</div>
	)
}

export default Receipt;
