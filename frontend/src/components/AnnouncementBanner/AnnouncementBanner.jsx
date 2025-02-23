import React, { useState, useEffect } from "react";
import "./AnnouncementBanner.css";

const AnnouncementBanner = () => {
  return (
    <div className="announcement-banner">
      <div className="announcement-text">
        🚨 We are currently not delivering to the hostel areas. 🚨
        ⏳ Fast delivery! Get your order in under 45 minutes. ⏳
        🍽️ Fresh and delicious meals delivered to your door. 🍽️
      </div>
    </div>
  );
};

export default AnnouncementBanner;
