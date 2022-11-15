import React from "react";
import { useShoppingCart } from "use-shopping-cart";

export default function AddToCart({ product }) {
  const { addItem, cartCount, cartDetails, totalPrice } = useShoppingCart();

  const handleAddItem = () => {
    addItem(product);
  };

  return (
    <button
      onClick={handleAddItem}
      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
    >
      Add To Cart
    </button>
  );
}
