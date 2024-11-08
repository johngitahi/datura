import { Link } from 'react-router-dom';
import styles from "../assets/page_styles/Admin.module.css";
import LogoutButton from '../components/LogoutButton';

function Admin() {
	return(
		<div className={styles.adminbar}>
			<h1>Admin Interface</h1>
			<div className={styles.adminlinks}>
				<div className={styles.navlink}>
					<Link to="/ConfirmedOrders">Confirmed Orders</Link>
				</div>
				<div className={styles.navlink}>
					<Link to="/AddMenu">Add Menu</Link>
				</div>
				<div className={styles.navlink}>
					<Link to="/AddHotel">Add Hotel</Link>
				</div>
			        <div className={styles.navlink}>
					<Link to="/research">Analytics</Link>
				</div>
				<LogoutButton />
			</div>
		</div>
	)
}

export default Admin;
