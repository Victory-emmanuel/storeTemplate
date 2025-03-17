/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { deleteProduct } from "../../services/products";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  Typography,
  Button,
  IconButton,
  Chip,
  Tooltip,
  Switch,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function ProductList({ products, onEdit }) {
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  // Filter products based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedTerm) ||
          product.category.toLowerCase().includes(lowercasedTerm) ||
          product.flavor.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, products]);

  const handleDelete = async (productId) => {
    if (window.confirm("Delete this product permanently?")) {
      setDeletingId(productId);
      try {
        await deleteProduct(productId);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const TABLE_HEAD = [
    { id: "image", label: "Image" },
    { id: "name", label: "Name" },
    { id: "price", label: "Price" },
    { id: "stock", label: "Stock" },
    { id: "category", label: "Category" },
    { id: "actions", label: "Actions" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={`w-full shadow-lg overflow-hidden ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="p-4 flex flex-wrap justify-between items-center gap-4">
          <Typography
            variant="h5"
            className={`font-PlayfairDisplay ${
              isDarkMode ? "text-white" : "text-secondary"
            }`}
          >
            Product List
          </Typography>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`relative flex w-full max-w-[24rem] items-center ${
                isDarkMode ? "text-white" : "text-secondary"
              }`}
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`peer h-10 w-full rounded-md border ${
                  isDarkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-secondary"
                } px-3 py-2 pl-10 text-sm outline-none focus:border-accent`}
              />
              <MagnifyingGlassIcon
                className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>

            <Button
              size="sm"
              className="flex items-center gap-2 bg-accent text-white shadow-none hover:shadow-md"
              onClick={() => document.getElementById("add-product-btn").click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Product
            </Button>
            <button id="add-product-btn" className="hidden" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table
            className={`w-full min-w-max table-auto text-left ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            <thead>
              <tr>
                {TABLE_HEAD.map(({ id, label }) => (
                  <th
                    key={id}
                    className={`border-b ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-gray-50"
                    } p-4`}
                  >
                    <Typography
                      variant="small"
                      className={`font-semibold leading-none opacity-70 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {label}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {currentItems.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`${
                      isDarkMode
                        ? "border-b border-gray-700 hover:bg-gray-700"
                        : "border-b border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-4">
                      <div className="h-16 w-16 overflow-hidden rounded-md">
                        <img
                          src={product.imageURL || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-secondary"
                        }`}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="small"
                        className={`font-normal ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {product.flavor}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-accent"
                        }`}
                      >
                        ₦{(product.price / 100).toLocaleString()}
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        variant="small"
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-secondary"
                        }`}
                      >
                        {product.stock}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Chip
                        value={product.category}
                        size="sm"
                        variant="ghost"
                        color={isDarkMode ? "green" : "pink"}
                        className={`rounded-full ${
                          isDarkMode
                            ? "bg-green-900/20 text-green-400"
                            : "bg-pink-100/80 text-pink-800"
                        }`}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Tooltip content="Edit">
                          <IconButton
                            variant="text"
                            color={isDarkMode ? "white" : "blue-gray"}
                            onClick={() => onEdit(product)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete">
                          <IconButton
                            variant="text"
                            color="red"
                            disabled={deletingId === product.id}
                            onClick={() => handleDelete(product.id)}
                          >
                            {deletingId === product.id ? (
                              <svg
                                className="animate-spin h-4 w-4"
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
                            ) : (
                              <TrashIcon className="h-4 w-4" />
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t p-4">
          <Typography
            variant="small"
            className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
            {filteredProducts.length} entries
          </Typography>

          <div className="flex items-center gap-2">
            <Button
              variant="text"
              color={isDarkMode ? "white" : "gray"}
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeftIcon strokeWidth={3} className="h-3 w-3" />
            </Button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              // Show limited page numbers with ellipsis
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={pageNumber}
                    variant={pageNumber === currentPage ? "filled" : "text"}
                    color={
                      pageNumber === currentPage
                        ? "pink"
                        : isDarkMode
                        ? "white"
                        : "gray"
                    }
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return (
                  <Typography
                    key={pageNumber}
                    variant="small"
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    ...
                  </Typography>
                );
              }
              return null;
            })}

            <Button
              variant="text"
              color={isDarkMode ? "white" : "gray"}
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
