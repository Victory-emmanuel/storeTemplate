// src\pages\Admin\Dashboard.jsx
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductForm from "../../components/Admin/ProductForm";
import ProductList from "../../components/Admin/ProductList";
import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";

export default function Dashboard() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loading } = useProducts();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" mx-auto px-12 py-8"
    >
      <Typography variant="h3" className=" text-secondary mb-8">
        Product Management
      </Typography>

      {/* Add/Edit Product Form */}
      <ProductForm
        product={selectedProduct}
        onClear={() => setSelectedProduct(null)}
      />

      {/* Product List with Edit/Delete */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : (
        <ProductList products={products} onEdit={setSelectedProduct} />
      )}
    </motion.div>
  );
}
