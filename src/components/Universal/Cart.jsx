// src/components/Cart.jsx

import { motion } from "framer-motion";
import { useCart } from "../../contexts/CartContext.jsx";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatter";

export default function Cart() {
  const {
    cart,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart, // Not currently used, but preserved to maintain original structure
  } = useCart();

  return (
    <motion.div
      // Container with light/dark backgrounds from your Tailwind config
      className="mx-auto px-6 ss:px-12 py-8 bg-primary dark:bg-black min-h-screen transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Page Title */}
      <Typography
        variant="h2"
        className="text-secondary dark:text-white mb-6 font-PlayfairDisplay"
      >
        Shopping Cart
      </Typography>

      {/* If cart is empty */}
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <Typography
            variant="h4"
            className="mb-4 text-secondary dark:text-white"
          >
            Your cart is empty
          </Typography>
          <Link to="/">
            <Button color="accent">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        /* If cart has items */
        <motion.div
          className="grid gap-6 md:grid-cols-[2fr_1fr]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Left column: list of cart items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="flex flex-wrap items-center gap-4 p-4 bg-white dark:bg-black dark:text-white rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <Typography
                    variant="h5"
                    className="text-secondary dark:text-white font-PlayfairDisplay"
                  >
                    {item.name}
                  </Typography>
                  <Typography className="text-accent font-bold">
                    {formatPrice(item.price)} each
                  </Typography>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    color="gray"
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </Button>
                  <Typography className="px-3">{item.quantity}</Typography>
                  <Button
                    size="sm"
                    color="gray"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </Button>
                </div>
                <Typography className="font-bold min-w-[100px] text-right text-secondary dark:text-white">
                  {formatPrice(item.price * item.quantity)}
                </Typography>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Right column: order summary */}
          <motion.div
            className="bg-white dark:bg-black dark:text-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <Typography
                variant="h5"
                className="text-secondary dark:text-white font-PlayfairDisplay"
              >
                Total:
              </Typography>
              <Typography
                variant="h4"
                className="text-accent font-PlayfairDisplay"
              >
                {formatPrice(total)}
              </Typography>
            </div>

            {/* Buttons row: Continue Shopping & Checkout */}
            <div className="flex flex-col gap-4">
              <Link to="/" className="block">
                <Button variant="outlined" color="accent" fullWidth>
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/checkout" className="block">
                <Button color="accent" fullWidth>
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
