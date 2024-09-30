import React from 'react';
import { PlusCircle, MinusCircle, ShoppingCart } from 'lucide-react';

const MenuItemCard = ({
  menuItem,
  addToCart,
  removeFromCart,
  isInCart,
}) => {

  const handleCartAction = () => {
    if (isInCart(menuItem.menu_id)) {
      removeFromCart(menuItem.menu_id);
    } else {
      addToCart(menuItem);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      {/* Image section commented out for future use
      <div className="relative h-48 bg-gray-200">
        <img
          src={menuItem.image_url || "/api/placeholder/400/300"}
          alt={menuItem.item_name}
          className="w-full h-full object-cover"
        />
	</div>
	*/}

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex-grow">
            {menuItem.item_name}
          </h3>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            Kshs.{menuItem.price.toFixed(0)}
          </span>
          <div className="flex items-center">
            {isInCart(menuItem.menu_id) && (
              <button
                onClick={() => removeFromCart(menuItem.menu_id)}
                className="p-1 rounded-full bg-red-500 text-white mr-2"
                aria-label="Remove from cart"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={handleCartAction}
              className={`px-4 py-2 rounded-full flex items-center ${
                isInCart(menuItem.menu_id)
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-500 text-white'
              }`}
            >
              {isInCart(menuItem.menu_id) ? (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
