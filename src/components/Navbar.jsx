import { useState, useEffect } from "react";
import {
  Navbar as MTNavbar,
  Typography,
  IconButton,
  Input,
  Collapse,
  Badge,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { cartItems, setCartVisible } = useCart();

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

  // Toggle dark mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  // Handle window resize
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      <Typography
        as="li"
        variant="small"
        className={`p-1 font-medium ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        <a
          href="#"
          className="flex items-center hover:text-gray-500 transition-colors"
        >
          Services
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className={`p-1 font-medium ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        <a
          href="#"
          className="flex items-center hover:text-gray-500 transition-colors"
        >
          Shop
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className={`p-1 font-medium ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        <a
          href="#"
          className="flex items-center hover:text-gray-500 transition-colors"
        >
          Blog
        </a>
      </Typography>
    </ul>
  );

  return (
    <MTNavbar
      className={`sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className={`mr-4 cursor-pointer py-1.5 font-bold text-xl ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <div className="flex items-center">
            <div className="mr-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 h-6 w-6 flex items-center justify-center">
              <span className="text-xs">Sh</span>
            </div>
            Shuffax
          </div>
        </Typography>

        <div className="hidden lg:block">{navList}</div>

        <div className="flex items-center gap-x-2">
          {showSearch ? (
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="pr-10 min-w-[200px]"
                containerProps={{
                  className: "min-w-[200px]",
                }}
                labelProps={{
                  className: "hidden",
                }}
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
              <IconButton
                variant="text"
                className="!absolute right-1 top-1 rounded-full"
                onClick={() => setShowSearch(false)}
              >
                <XMarkIcon className="h-4 w-4" />
              </IconButton>
            </div>
          ) : (
            <IconButton
              variant="text"
              className={`rounded-full ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
              onClick={() => setShowSearch(true)}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </IconButton>
          )}

          <IconButton
            variant="text"
            className={`rounded-full ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </IconButton>

          <IconButton
            variant="text"
            className={`rounded-full ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <UserIcon className="h-5 w-5" />
          </IconButton>

          <Badge
            content={cartItems.length}
            className={`${cartItems.length === 0 ? "hidden" : ""}`}
            color="gray"
          >
            <IconButton
              variant="text"
              className={`rounded-full ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
              onClick={() => setCartVisible(true)}
            >
              <ShoppingBagIcon className="h-5 w-5" />
            </IconButton>
          </Badge>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon
                className={`h-6 w-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              />
            ) : (
              <Bars3Icon
                className={`h-6 w-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>{navList}</Collapse>
    </MTNavbar>
  );
}
