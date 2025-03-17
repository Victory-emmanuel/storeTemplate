// src/components/Cart.jsx
import { useCart } from "../contexts/CartContext.jsx";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatter";
export default function Cart() {
  const {
    cart,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h2" className="text-secondary mb-6">
        Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <Typography variant="h4" className="mb-4">
            Your cart is empty
          </Typography>
          <Link to="/">
            <Button color="accent">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md"
              >
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <Typography variant="h5" className="text-secondary">
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
                <Typography className="font-bold min-w-[100px] text-right">
                  {formatPrice(item.price * item.quantity)}
                </Typography>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h5">Total:</Typography>
              <Typography variant="h4" className="text-accent">
                {formatPrice(total)}
              </Typography>
            </div>
            <Link to="/checkout" className="block">
              <Button color="accent" fullWidth>
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
