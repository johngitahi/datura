// src/App.jsx

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import {
  AddHotel,
  AddMenu,
  Cart,
  ConfirmedOrders,
  Home,
  HotelList,
  Menu,
  Admin,
  LoginPage,
} from "./pages";

import Dashboard from "./components/Dashboard";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import "./App.css";
import "./fontConfig";
import ReactGA from "react-ga4";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  ReactGA.initialize("G-ED1HCK9BWY"); 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="hotels" element={<Outlet />}>
            <Route index element={<HotelList />} />
            <Route path=":hotelId" element={<Menu />} />
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/Admin' element={<Admin/>} />
            <Route path="ConfirmedOrders" element={<ConfirmedOrders />} />
            <Route path="AddHotel" element={<AddHotel />} />
            <Route path="AddMenu" element={<AddMenu />} />
	    <Route path="research" element={<Dashboard />} />  
          </Route>
          <Route path='/login' element={<LoginPage/>} />

          {/* add links to whatever is below this comment to the admin page */} 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
