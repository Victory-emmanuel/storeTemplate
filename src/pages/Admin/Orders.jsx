// src/pages/Admin/Orders.jsx
import { Card, Typography, Spinner } from "@material-tailwind/react";
import { useOrders } from "../../services/orders";
import OrderRow from "../../components/Admin/OrderRow";
import OrderStats from "../../components/Admin/OrderStats";

export default function OrdersPage() {
  const { orders, loading, error } = useOrders();

  if (loading) {
    return (
      <div className="flex justify-center mt-12">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        <Typography variant="h4" className="mb-2">
          Error loading orders: {error.message}
        </Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h2" className="text-secondary mb-8">
        Order Management
      </Typography>

      {orders.length > 0 ? (
        <>
          <OrderStats orders={orders} />
          <Card className="overflow-hidden shadow-lg">
            <table className="w-full min-w-max">
              <thead>
                <tr className="bg-primary">
                  <th className="p-4 text-left">
                    <Typography variant="h6" className="text-secondary">
                      Order ID
                    </Typography>
                  </th>
                  <th className="p-4 text-left">
                    <Typography variant="h6" className="text-secondary">
                      Customer
                    </Typography>
                  </th>
                  <th className="p-4 text-left">
                    <Typography variant="h6" className="text-secondary">
                      Status
                    </Typography>
                  </th>
                  <th className="p-4 text-left">
                    <Typography variant="h6" className="text-secondary">
                      Total
                    </Typography>
                  </th>
                  <th className="p-4 text-left">
                    <Typography variant="h6" className="text-secondary">
                      Date
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </Card>
        </>
      ) : (
        <div className="p-4 text-center">
          <Typography variant="h4">No orders found</Typography>
        </div>
      )}
    </div>
  );
}
