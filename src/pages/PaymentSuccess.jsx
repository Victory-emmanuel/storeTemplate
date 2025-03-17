import { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

export default function PaymentSuccess() {
  useEffect(() => {
    // Track conversion with analytics
    window.gtag("event", "purchase", {
      currency: "NGN",
      value: new URLSearchParams(window.location.search).get("amount") / 100,
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-xl">
        <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-secondary mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. Transaction ID:{" "}
          {new URLSearchParams(location.search).get("transaction_id")}
        </p>
        <Button
          color="accent"
          onClick={() => (window.location.href = "/orders")}
        >
          View Orders
        </Button>
      </div>
    </div>
  );
}
