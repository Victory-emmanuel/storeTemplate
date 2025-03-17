// pages\Storefront\ProductList.jsx
import { useState, useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import {
  Input,
  Select,
  Option,
  Spinner,
  Button,
} from "@material-tailwind/react";
import ProductCard from "../../components/ProductCard";
import ErrorBoundaryWrapper from "../../components/ErrorBoundary";
import CartIcon from "../../components/CartIcon";
import Hero from "../../components/Hero";

export default function ProductList() {
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, Infinity]);

  // Debounced search
  const handleSearch = (value) => {
    setTimeout(() => setSearchTerm(value.toLowerCase()), 300);
  };

  // Memoized filtered products
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) &&
          (selectedCategory === "all" ||
            product.category === selectedCategory) &&
          product.price >= priceRange[0] * 100 && // Convert NGN to kobo
          product.price <= priceRange[1] * 100
      ),
    [products, searchTerm, selectedCategory, priceRange]
  );

  // Function to clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setPriceRange([0, 500000]);
  };

  if (loading) return <Spinner className="h-12 w-12" />;

  return (
    <div className=" mx-auto py-8">
      <CartIcon />
      <Hero />
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-8  px-12">
        <Input
          label="Search products..."
          onChange={(e) => handleSearch(e.target.value)}
          icon={<i className="fas fa-search" />}
        />

        <Select
          label="Category"
          value={selectedCategory}
          onChange={(value) => setCategory(value)}
        >
          <Option value="all">All Categories</Option>
          <Option value="Wedding">Wedding</Option>
          <Option value="Birthday">Birthday</Option>
          <Option value="Casual">Casual</Option>
        </Select>

        <Select
          label="Price Range"
          onChange={(value) => setPriceRange(JSON.parse(value))}
        >
          <Option value="[0,500000]">All prices</Option>
          <Option value="[0,5000]">₦0 - ₦10,000</Option>
          <Option value="[5000,10000]">₦5,000 - ₦10,000</Option>
          <Option value="[10000,20000]">₦10,000 - ₦20,000</Option>
          <Option value="[20000,50000]">₦20,000 - ₦50,000</Option>
          <Option value="[50000,75000]">₦50,000 - ₦75,000</Option>
          <Option value="[75000,100000]">₦75,000 - ₦100,000</Option>
          <Option value="[100000,500000]">₦100,000+</Option>
        </Select>
        {/* Clear Filters Button */}
        {(searchTerm !== "" ||
          selectedCategory !== "all" ||
          priceRange[0] !== 0 ||
          priceRange[1] !== 500000) && (
          <Button color="red" onClick={clearFilters} size="sm">
            Clear Filters
          </Button>
        )}
      </div>

      {/* Product Grid */}

      <ErrorBoundaryWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  px-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </ErrorBoundaryWrapper>
    </div>
  );
}
