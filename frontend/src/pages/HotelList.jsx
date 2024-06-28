import styles from "../assets/page_styles/HotelList.module.scss";
import FeaturedHotelsSection from "../components/FeaturedHotelsSection"

const HotelList = () => {
	return (
		<div className={styles.hotellist}>
			<h3>Our Partners</h3>
			<p>We have partnered with the best hotels to bring you a wide variety of delicious meals</p>
			<div className={styles.hotels}>
				<FeaturedHotelsSection />
			</div>
		</div>
	)
}

export default HotelList;