//src\pages\Checkout.jsx
import CheckoutForm from "../components/Checkout/CheckoutForm";
import { Typography } from "@material-tailwind/react";
import { formatPrice } from "../utils/formatter";
import { useCart } from "../contexts/CartContext.jsx";

export default function Checkout() {
  const { cart, total } = useCart();

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h2" className="text-secondary mb-6">
        Checkout
      </Typography>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Typography variant="h5" className="mb-4">
            Order Summary
          </Typography>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <Typography>
                  {item.name} x{item.quantity}
                </Typography>
                <Typography className="font-bold">
                  {formatPrice(item.price * item.quantity)}
                </Typography>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <Typography>Total:</Typography>
                <Typography className="text-accent">
                  {formatPrice(total)}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
