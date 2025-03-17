/* eslint-disable react/prop-types */
//src\components\ProductCard.jsx
import { useState, useEffect } from "react";
import { formatPrice } from "../utils/formatter";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { HeartIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useCart } from "../contexts/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart, setCartVisible } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
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

  const handleAddToCart = () => {
    // Add the product with the selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setCartVisible(true);
    // Reset quantity after adding to cart
    setQuantity(1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card
        className={`h-full overflow-hidden ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white"
        }`}
        style={{ borderRadius: "24px" }}
      >
        {/* Product Image */}
        <CardHeader
          floated={false}
          className="h-52 sm:h-64 md:h-72 m-0 rounded-t-lg rounded-b-none"
        >
          <img
            src={product.imageURL || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/placeholder.jpg";
            }}
          />
        </CardHeader>

        {/* Product Info */}
        <CardBody
          className={`px-5 pt-6 pb-3 ${
            isDarkMode ? "bg-amber-800/90" : "bg-amber-100"
          }`}
        >
          <Typography
            variant="small"
            className={`mb-1 ${
              isDarkMode ? "text-amber-200/80" : "text-amber-800/80"
            }`}
          >
            Product
          </Typography>

          <Typography
            variant="h3"
            className={`font-bold font-PlayfairDisplay ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {product.name}
          </Typography>

          <div className="flex items-center justify-between mt-2">
            <Typography
              variant="h4"
              className={`font-bold ${
                isDarkMode ? "text-amber-200" : "text-amber-600"
              }`}
            >
              {formatPrice(product.price)}
            </Typography>
          </div>

          {/* Nutritional Info */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3">
            <div className="flex items-center">
              <Typography
                variant="small"
                className={`${
                  isDarkMode ? "text-amber-200/70" : "text-amber-800/70"
                }`}
              >
                Flavor
              </Typography>
              <Typography
                variant="small"
                className={`ml-2 font-medium ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {product.flavor}
              </Typography>
            </div>

            {product.popular && (
              <div className="flex items-center">
                <Typography
                  variant="small"
                  className={`${
                    isDarkMode ? "text-amber-200/70" : "text-amber-800/70"
                  }`}
                >
                  Status
                </Typography>
                <Typography
                  variant="small"
                  className="ml-2 font-medium text-accent"
                >
                  Popular!
                </Typography>
              </div>
            )}
          </div>
        </CardBody>

        <CardFooter
          className={`flex items-center justify-between pt-0 pb-5 px-5 ${
            isDarkMode ? "bg-amber-800/90" : "bg-amber-100"
          }`}
        >
          <IconButton
            variant="text"
            size="lg"
            className={`rounded-xl p-3 ${
              isDarkMode ? "bg-amber-700/50" : "bg-white"
            } ${
              isFavorite
                ? "text-red-500"
                : isDarkMode
                ? "text-white"
                : "text-gray-700"
            }`}
            onClick={toggleFavorite}
          >
            {isFavorite ? (
              <HeartIconSolid className="h-6 w-6" />
            ) : (
              <HeartIcon className="h-6 w-6" />
            )}
          </IconButton>

          <Button
            size="lg"
            className={`flex items-center justify-between gap-3 rounded-xl px-6 ${
              isDarkMode
                ? "bg-amber-600 text-white"
                : "bg-amber-200 text-amber-900"
            }`}
            onClick={handleAddToCart}
          >
            <span className="font-medium">Add to Cart</span>
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
