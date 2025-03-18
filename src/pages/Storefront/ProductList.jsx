// pages\Storefront\ProductList.jsx
import { useState, useMemo, useEffect } from "react";
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
import Hero from "../../components/Hero";

export default function ProductList() {
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode preference
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
    }

    const darkModeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    darkModeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => darkModeObserver.disconnect();
  }, []);

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
    <div
      className={` mx-auto pb-16   ${
        isDarkMode ? "bg-secondary " : "bg-primary "
      }`}
    >
      <Hero />
      {/* Filter Controls */}
      <div className="grid sm:grid-cols-3 md:grid-cols-4 xs:grid-cols-2 grid-cols-1 gap-4 mb-8 px-6 ss:px-12">
        <Input
          label="Search products..."
          onChange={(e) => handleSearch(e.target.value)}
          icon={<i className="fas fa-search" />}
          className={` ${
            isDarkMode
              ? "bg-black text-primary border-white/40 focus:outline-white focus:border-white focus:border focus:text-white"
              : "bg-primary text-black border-black/60"
          }`}
          labelProps={{
            className: `${isDarkMode ? "text-white" : "text-black/50"}`,
          }}
        />

        <Select
          label="Category"
          value={selectedCategory}
          onChange={(value) => setCategory(value)}
          className={` ${
            isDarkMode
              ? "bg-secondary/70 text-primary border-white/40"
              : "bg-primary/70 text-secondary border-black/60"
          }`}
          labelProps={{
            className: `${isDarkMode ? "text-white" : "text-black"}`,
          }}
        >
          <Option className="text-accent" value="all">
            All Categories
          </Option>
          <Option className="text-accent" value="Wedding">
            Wedding
          </Option>
          <Option className="text-accent" value="Birthday">
            Birthday
          </Option>
          <Option className="text-accent" value="Casual">
            Casual
          </Option>
        </Select>

        <Select
          label="Price Range"
          onChange={(value) => setPriceRange(JSON.parse(value))}
          className={` ${
            isDarkMode
              ? "bg-secondary/70 text-primary border-white/40"
              : "bg-primary/70 text-secondary border-black/60"
          }`}
          labelProps={{
            className: `${isDarkMode ? "text-white" : "text-black"}`,
          }}
        >
          <Option className="text-accent" value="[0,500000]">
            All prices
          </Option>
          <Option className="text-accent" value="[0,5000]">
            ₦0 - ₦5,000
          </Option>
          <Option className="text-accent" value="[5000,10000]">
            ₦5,000 - ₦10,000
          </Option>
          <Option className="text-accent" value="[10000,20000]">
            ₦10,000 - ₦20,000
          </Option>
          <Option className="text-accent" value="[20000,50000]">
            ₦20,000 - ₦50,000
          </Option>
          <Option className="text-accent" value="[50000,75000]">
            ₦50,000 - ₦75,000
          </Option>
          <Option className="text-accent" value="[75000,100000]">
            ₦75,000 - ₦100,000
          </Option>
          <Option className="text-accent" value="[100000,500000]">
            ₦100,000+
          </Option>
        </Select>
        {/* Clear Filters Button */}
        {(searchTerm !== "" ||
          selectedCategory !== "all" ||
          priceRange[0] !== 0 ||
          priceRange[1] !== 500000) && (
          <Button
            className={` ${
              isDarkMode
                ? "bg-accent text-white hover:bg-accent/70 hover:shadow-md hover:shadow-accent/40"
                : "bg-accent text-white hover:bg-accent/70 hover:shadow-md hover:shadow-accent/40"
            } transition-all duration-300`}
            onClick={clearFilters}
            size="sm"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Product Grid */}

      <ErrorBoundaryWrapper>
        <div
          className={`grid grid-cols-1 ss:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-6 px-6  ss:px-12 ${
            isDarkMode ? "bg-secondary" : "bg-primary"
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </ErrorBoundaryWrapper>
    </div>
  );
}
