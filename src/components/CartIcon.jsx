// src/components/CartIcon.jsx
import { useCart } from "../contexts/CartContext.jsx";
import { Badge, Button, Dialog, Typography } from "@material-tailwind/react";
import { formatPrice } from "../utils/formatter";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function CartIcon() {
  const { cart, total, cartVisible, setCartVisible } = useCart();

  return (
    <>
      <Badge content={cart.length} className="!font-bold">
        <Button
          variant="text"
          className="p-2 text-accent"
          onClick={() => setCartVisible(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </Button>
      </Badge>

      <Dialog open={cartVisible} handler={() => setCartVisible(false)}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5">Your Cart</Typography>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setCartVisible(false)}
            />
          </div>

          {cart.length === 0 ? (
            <Typography className="text-center py-4">
              Your cart is empty
            </Typography>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography className="text-sm">
                        {item.quantity} x {formatPrice(item.price)}
                      </Typography>
                    </div>
                    <Typography className="font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </Typography>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h5" className="text-accent">
                    {formatPrice(total)}
                  </Typography>
                </div>
                <Link to="/cart" onClick={() => setCartVisible(false)}>
                  <Button color="accent" fullWidth>
                    View Cart & Checkout
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
}
