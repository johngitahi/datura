import React, { useState, useEffect } from 'react';
import TodayOrders from './TodayOrders';
import WeeklyAnalytics from './WeeklyAnalytics';
import DailyAnalytics from './DailyAnalytics';
import AllOrdersToday from './AllOrdersToday';
import MobileNav from './MobileNav';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <MobileNav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-6">
          <TodayOrders />
          <WeeklyAnalytics />
          <DailyAnalytics />
          <AllOrdersToday />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
