import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import your CSS module

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();
  
  const navigateToHotels = () => {
    navigate('/hotels')
  }

  // I am thinking about deleting the state hooks as i am not using them for nothing
  // my thinking is that i can just use media queries to structure the site differently
  // for the mobile screen and for the desktop screen. However since this works now, I
  // won't risk breaking it as it looks great right now.

  return (
    <nav className={styles.navigation}>
      <button
        // className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`} original working version
        className={styles.menuToggle} // tweaked version
        onClick={navigateToHotels}
      >Order Now
      </button>
      <ul className={`${styles.navlist} ${menuOpen ? styles.open : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/hotels">Hotels</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
