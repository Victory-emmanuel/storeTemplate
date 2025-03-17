import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import HomePage from "./pages/HomePage";
import AdminRoute from "./components/AdminRoute";
import OrdersPage from "./pages/Admin/Orders";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <OrdersPage />
            </AdminRoute>
          }
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
