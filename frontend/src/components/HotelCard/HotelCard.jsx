// import React from 'react';
import styles from './HotelCard.module.scss'; // Import your stylesheet
import { Link } from 'react-router-dom';

function HotelCard({ id, name, imageSrc, description }) {
    return (
        <div className={styles.card__container}>
            <Link to={`/hotels/${id}`}>
                <div className={styles.restaurant__card}>
                    <img src={imageSrc} alt={name} />
                    <button className={styles.cta__button}>
                    Browse Menu
                    </button>
                </div>
            </Link>
        </div>
    );
}

export default HotelCard;
