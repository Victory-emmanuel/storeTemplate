// src/components/Admin/OrderRow.jsx
import { Select, Option, Typography } from "@material-tailwind/react";
import { updateOrderStatus } from "../../services/orders";
import { formatPrice } from "../../utils/formatter";

export default function OrderRow({ order }) {
  const handleStatusChange = async (value) => {
    try {
      await updateOrderStatus(order.id, value);
    } catch (error) {
      console.error("Status change failed:", error);
      alert(`Failed to update status: ${error.message}`);
    }
  };

  if (!order) return null; // Added a null check for order prop

  return (
    <tr key={order.id} className="hover:bg-gray-50">
      <td className="p-4">
        <Typography variant="small" className="font-medium">
          #{order.id.slice(0, 8).toUpperCase()}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small">{order.customerEmail}</Typography>
      </td>
      <td className="p-4">
        <Select
          value={order.status}
          onChange={handleStatusChange}
          className="!min-w-[150px]"
          color={getStatusColor(order.status)}
        >
          <Option value="pending">Pending</Option>
          <Option value="processing">Processing</Option>
          <Option value="completed">Completed</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </td>
      <td className="p-4">
        <Typography variant="small" className="font-bold">
          {formatPrice(order.total)}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small">
          {order.createdAt?.toLocaleDateString("en-NG")}
        </Typography>
      </td>
    </tr>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "amber";
    case "processing":
      return "blue";
    case "completed":
      return "green";
    case "cancelled":
      return "red";
    default:
      return "gray";
  }
};
