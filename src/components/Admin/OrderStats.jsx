/* eslint-disable react/prop-types */
// src/components/Admin/OrderStats.jsx
import { Card, Typography } from "@material-tailwind/react";
import { formatPrice } from "../../utils/formatter";

export default function OrderStats({ orders }) {
  if (!orders || orders.length === 0) {
    return <div>No order data available.</div>;
  }

  const totalSalesKobo = orders.reduce((acc, order) => acc + order.total, 0);
  const averageOrderKobo =
    orders.length > 0 ? totalSalesKobo / orders.length : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Total Orders"
        value={orders.length}
        color="bg-blue-100"
      />
      <StatCard
        title="Total Sales"
        value={formatPrice(totalSalesKobo)}
        color="bg-green-100"
      />
      <StatCard
        title="Pending Orders"
        value={orders.filter((order) => order.status === "pending").length}
        color="bg-amber-100"
      />
      <StatCard
        title="Average Order"
        value={formatPrice(averageOrderKobo)}
        color="bg-purple-100"
      />
    </div>
  );
}

const StatCard = ({ title, value, color }) => (
  <Card className={`p-6 ${color}`}>
    <Typography variant="h6" className="text-secondary mb-2">
      {title}
    </Typography>
    <Typography variant="h3" className="text-accent">
      {value}
    </Typography>
  </Card>
);
