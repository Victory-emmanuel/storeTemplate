/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-async-promise-executor */
import { useFlutterwave } from "flutterwave-react-v3";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export const useFlutterwavePayment = () => {
  const createOrder = async (paymentResponse, items, customer) => {
    try {
      const orderData = {
        paymentId: paymentResponse.transaction_id,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price, // Should be in kobo
          quantity: item.quantity,
        })),
        total: paymentResponse.amount, // Should be in kobo
        status: "pending",
        createdAt: serverTimestamp(),
      };

      console.log("Creating order:", orderData); // Debug log
      await addDoc(collection(db, "orders"), orderData);
    } catch (error) {
      console.error("Order creation failed:", error);
      throw error;
    }
  };

  const handlePayment = (cartItems, total, customer, clearCart) => {
    const config = {
      public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      amount: total / 100,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: customer.email,
        phone_number: customer.phone,
        name: customer.name,
      },
      customizations: {
        title: "Your Store Name",
        description: "Secure Payment",
        logo: "https://your-store-logo.png", // Replace with your logo URL
      },
    };

    const flutterwave = useFlutterwave(config);

    return async () => {
      return new Promise(async (resolve, reject) => {
        flutterwave({
          callback: async (response) => {
            try {
              const orderCreated = await createOrder(
                response,
                cartItems,
                customer
              );
              if (response.status === "successful" && orderCreated) {
                clearCart();
                resolve(response);
              } else {
                reject(new Error(response.message || "Payment failed."));
              }
            } catch (error) {
              reject(error);
            }
          },
          onclose: () => {
            reject(new Error("Payment closed by user."));
          },
        });
      });
    };
  };

  return { handlePayment };
};
