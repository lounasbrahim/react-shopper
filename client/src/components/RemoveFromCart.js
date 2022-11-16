import React from "react";
import toast from "react-hot-toast";
import { useShoppingCart } from "use-shopping-cart";

export default function RemoveFromCart({ product }) {
  const { removeItem, cartCount, cartDetails, totalPrice } = useShoppingCart();

  function handleRemoveItem() {
    removeItem(product.sku);
    return isItemInCart(product.sku)
      ? toast.success(`${product.name} is removed from your Cart`)
      : toast.error(`The is no ${product.name} in your Cart`);
  }

  const isItemInCart = (productSku) => {
    return cartDetails[productSku] ? true : false;
  };

  console.log({ cartCount, cartDetails, totalPrice });
  return (
    <button
      onClick={handleRemoveItem}
      className="flex ml-2 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
      disabled={!cartCount}
    >
      Remove
    </button>
  );
}
