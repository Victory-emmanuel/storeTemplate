import { XCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

export default function PaymentFailed() {
  const transactionId = new URLSearchParams(location.search).get("tx_ref");

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-xl">
        <XCircleIcon className="h-20 w-20 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-secondary mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          Transaction reference: {transactionId}
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            color="accent"
            onClick={() => (window.location.href = "/checkout")}
          >
            Retry Payment
          </Button>
          <Button color="gray" onClick={() => (window.location.href = "/")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
