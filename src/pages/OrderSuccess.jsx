import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
        <Typography variant="h2" className="mb-4">
          Order Successful!
        </Typography>
        <Typography className="mb-6">
          Thank you for your purchase. Your order is being processed.
        </Typography>
        <div className="flex gap-4 justify-center">
          <Link to="/orders">
            <Button color="accent">View Orders</Button>
          </Link>
          <Link to="/">
            <Button color="gray">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
