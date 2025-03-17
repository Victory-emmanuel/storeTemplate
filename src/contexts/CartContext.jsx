/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */

import { createContext, useContext, useReducer, useState } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  console.log("Current State:", state); // Debugging: Log the current state
  console.log("Action:", action); // Debugging: Log the action being dispatched
  switch (action.type) {
    case "ADD_ITEM":
      if (!Array.isArray(state)) {
        console.error("Error: state is not an array in ADD_ITEM");
        return []; // Return empty array if state is not array
      }
      if (!action.payload || !action.payload.id) {
        console.error(
          "Error: ADD_ITEM payload is missing id property",
          action.payload
        );
        return state; // return original state
      }
      console.log("Adding item with ID:", action.payload.id); // Debugging

      const existingItem = state.find((item) => item.id === action.payload.id);
      console.log("Existing Item:", existingItem); // Debugging
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "INCREASE_QUANTITY":
      if (!Array.isArray(state)) {
        console.error("Error: state is not an array in INCREASE_QUANTITY");
        return [];
      }
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE_QUANTITY":
      if (!Array.isArray(state)) {
        console.error("Error: state is not an array in DECREASE_QUANTITY");
        return [];
      }
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );

    case "REMOVE_ITEM":
      if (!Array.isArray(state)) {
        console.error("Error: state is not an array in REMOVE_ITEM");
        return [];
      }
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_CART":
      if (!Array.isArray(state)) {
        console.error("Error: state is not an array in CLEAR_CART");
        return [];
      }
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartVisible, setCartVisible] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error("Error: Attempting to add an item without an ID:", product);
      return; // prevent adding an item without an ID
    }
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const increaseQuantity = (productId) =>
    dispatch({ type: "INCREASE_QUANTITY", payload: productId });
  const decreaseQuantity = (productId) =>
    dispatch({ type: "DECREASE_QUANTITY", payload: productId });
  const removeItem = (productId) =>
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartVisible,
        setCartVisible,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
