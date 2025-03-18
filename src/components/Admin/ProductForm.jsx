/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../../services/products";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
  Checkbox,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ProductForm({ product, onClear }) {
  const initialFormData = product || {
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    imageURL: "",
    flavor: "",
    popular: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || Number.parseFloat(formData.price) < 0) {
      newErrors.price = "Price must be a valid number";
    } else if (Number.parseFloat(formData.price) % 1 !== 0) {
      newErrors.price = "Price must be a whole number";
    }
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.stock) {
      newErrors.stock = "Stock is required";
    } else if (isNaN(formData.stock) || Number.parseInt(formData.stock) < 0) {
      newErrors.stock = "Stock must be a valid positive number";
    }
    if (!formData.imageURL) newErrors.imageURL = "Image URL is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.flavor) newErrors.flavor = "Flavor is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price) * 100,
        stock: Number.parseInt(formData.stock),
        imageURL: formData.imageURL,
      };

      if (product?.id) {
        await updateProduct(product.id, productData);
      } else {
        await addProduct(productData);
      }

      onClear();
    } catch (error) {
      console.error("Operation failed:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    const newValue =
      type === "checkbox"
        ? checked
        : id === "price" || id === "stock"
        ? value.replace(/[^0-9]/g, "")
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: null }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <Card
        className={`w-full max-w-4xl mx-auto shadow-lg ${
          isDarkMode ? "bg-black/80 text-gray-100" : "bg-white"
        }`}
      >
        <CardHeader
          variant="gradient"
          className={`p-6 ${
            isDarkMode ? "bg-gray-700" : "bg-accent"
          } flex justify-between items-center`}
        >
          <Typography
            variant="h5"
            className={`font-PlayfairDisplay ${
              isDarkMode ? "text-white" : "text-primary"
            }`}
          >
            {product?.id ? "Edit Product" : "Add New Product"}
          </Typography>
          {product?.id && (
            <IconButton
              variant="text"
              color="white"
              onClick={onClear}
              className="rounded-full"
            >
              <XMarkIcon className="h-6 w-6" />
            </IconButton>
          )}
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <Input
                id="name"
                type="text"
                label="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                color={isDarkMode ? "white" : "pink"}
                className={`${isDarkMode ? "text-white" : "text-secondary"}`}
                required
              />
              {errors.name && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  {errors.name}
                </Typography>
              )}
            </div>

            <div>
              <Input
                id="price"
                type="text"
                label="Price (NGN)"
                value={formData.price}
                onChange={handleInputChange}
                error={!!errors.price}
                color={isDarkMode ? "white" : "pink"}
                className={`${isDarkMode ? "text-white" : "text-secondary"}`}
                required
              />
              {errors.price && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  {errors.price}
                </Typography>
              )}
            </div>

            <div>
              <Input
                id="stock"
                type="text"
                label="Stock"
                value={formData.stock}
                onChange={handleInputChange}
                error={!!errors.stock}
                color={isDarkMode ? "white" : "pink"}
                className={`${isDarkMode ? "text-white" : "text-secondary"}`}
                required
              />
              {errors.stock && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  {errors.stock}
                </Typography>
              )}
            </div>

            <div>
              <Input
                id="category"
                type="text"
                label="Category"
                value={formData.category}
                onChange={handleInputChange}
                error={!!errors.category}
                color={isDarkMode ? "white" : "pink"}
                className={`${isDarkMode ? "text-white" : "text-secondary"}`}
                required
              />
              {errors.category && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  {errors.category}
                </Typography>
              )}
            </div>

            <div>
              <Input
                id="imageURL"
                type="text"
                label="Image URL"
                value={formData.imageURL}
                onChange={handleInputChange}
                error={!!errors.imageURL}
                color={isDarkMode ? "white" : "pink"}
                className={`${isDarkMode ? "text-white" : "text-secondary"}`}
                required
              />
              {errors.imageURL && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  {errors.imageURL}
                </Typography>
              )}
            </div>

            <div>
              <Input
                id="flavor"
                type="text"
                label="Flavor"
                value={formData.flavor}
                onChange={handleInputChange}
                error={!!errors.flavor}
                color={isDarkMode ? "white" : "pink"}
                className={`${isDarkMode ? "text-white" : "text-secondary"}`}
                required
              />
              {errors.flavor && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  {errors.flavor}
                </Typography>
              )}
            </div>

            <div className="md:col-span-2">
              <Textarea
                id="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                error={!!errors.description}
                color={isDarkMode ? "white" : "pink"}
                className={`${isDarkMode ? "text-white" : "text-secondary"}`}
                required
              />
              {errors.description && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  {errors.description}
                </Typography>
              )}
            </div>

            <div className="md:col-span-2">
              <Checkbox
                id="popular"
                label="Popular Product"
                checked={formData.popular}
                onChange={handleInputChange}
                color={isDarkMode ? "white" : "pink"}
                className="h-4 w-4"
                containerProps={{ className: "-ml-1" }}
                labelProps={{
                  className: `font-medium ${
                    isDarkMode ? "text-white" : "text-secondary"
                  }`,
                }}
              />
            </div>
          </CardBody>

          <CardFooter className="pt-0 px-6 pb-6 flex flex-wrap gap-4">
            <Button
              type="submit"
              disabled={loading}
              className={`flex-1 bg-accent text-white shadow-none hover:shadow-lg ${
                loading ? "opacity-70" : ""
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : product?.id ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>

            {product?.id && (
              <Button
                type="button"
                onClick={onClear}
                variant="outlined"
                className={`flex-1 ${
                  isDarkMode
                    ? "border-gray-500 text-gray-300"
                    : "border-secondary text-secondary"
                } hover:bg-primary hover:opacity-80`}
              >
                Cancel
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
