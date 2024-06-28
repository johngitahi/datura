// src/pages/Home.jsx
import "../assets/page_styles/Home.css";
import FeaturedHotelsSection from "../components/FeaturedHotelsSection";

const Home = () => {
	return (
		<main>
			<section className="value-prop">
				<h1>Tasty Food Delivered to you,<br />at whatever time!<br /> effortlessly!</h1>
				<p>Order from a variety of local restaurants we have partnered with and enjoy hassle-free delivery.</p>
				<a href="#featured-restaurants" className="cta-button">Browse Restaurants</a>
			</section>
			<FeaturedHotelsSection />
		</main>
	)
}

export default Home;
