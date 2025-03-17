// src/components/Checkout/CheckoutForm.jsx

import { useForm } from "react-hook-form";
import { Input, Button } from "@material-tailwind/react";
import { useCart } from "../../contexts/CartContext.jsx";
import { useFlutterwavePayment } from "../../services/payment";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatter";

export default function CheckoutForm() {
  const { cart, total, clearCart } = useCart();
  const { handlePayment } = useFlutterwavePayment();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!cart || cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const paymentInitiator = handlePayment(cart, total, data, clearCart);
      if (paymentInitiator) {
        const response = await paymentInitiator();
        if (response.status === "successful") {
          alert("Payment successful!"); // You might want a more sophisticated success message
          // Redirect to success page or update UI accordingly
          window.location.href = "/order-success";
        } else {
          alert(
            `Payment failed: ${
              response.message || "An unknown error occurred."
            }`
          );
          console.error("Payment failed:", response);
        }
      } else {
        console.error("Flutterwave payment initialization failed.");
        alert("Payment initialization failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert(
        `An unexpected error occurred: ${
          error.message || "An unknown error occurred."
        }`
      );
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Input fields for name, email, and phone number */}
          <Input
            label="Full Name"
            {...register("name", { required: "Name is required" })}
            error={errors.name ? true : false} //Simplified error handling
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}

          <Input
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email ? true : false}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          <Input
            label="Phone Number"
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{11}$/, // Adjust pattern as needed for your phone number format
                message: "Invalid phone number",
              },
            })}
            error={errors.phone ? true : false}
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}

          <div className="mt-6">
            <Button
              type="submit"
              fullWidth
              color="accent"
              className="flex items-center justify-center gap-2"
            >
              Pay ₦{formatPrice(total)}
              <i className="fas fa-lock ml-2" />
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-6"></div>
      <Link to="/">
        <Button color="accent">Continue Shopping</Button>
      </Link>
    </div>
  );
}
