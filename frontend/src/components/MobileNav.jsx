import React, { useState } from 'react';
import { Menu, X, Home, BarChart2, ShoppingBag } from 'lucide-react';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-semibold text-xl">zipT Analytics</span>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-800 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              <Home className="inline-block mr-2" size={18} />
              Dashboard
            </a>
            <a href="#" className="text-gray-800 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              <BarChart2 className="inline-block mr-2" size={18} />
              Analytics
            </a>
            <a href="#" className="text-gray-800 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              <ShoppingBag className="inline-block mr-2" size={18} />
              Orders
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
