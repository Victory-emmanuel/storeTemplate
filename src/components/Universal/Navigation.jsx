import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Collapse, IconButton } from "@material-tailwind/react";
import { motion } from "framer-motion";
import {
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

const NavLinks = [
  // { name: "Home", path: "/" },
  // { name: "Shop", path: "/shop" },
  // { name: "About", path: "/about" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const navVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  return (
    <Navbar
      className="sticky top-0 z-50 dark:bg-black dark:text-white bg-white text-secondary/80 rounded-none px-6 ss:px-12 py-4 border-none shadow-lg shadow-secondary/10 dark:shadow-primary/10"
      fullWidth
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div variants={navVariants} className="col-span-1">
          <Link
            to="/"
            className="flex items-center font-bold text-3xl space-x-2"
          >
            {/* large sreen */}
            {/* <img
              src="https://i.postimg.cc/ZKFdvdRf/11zon-cropped-1-removebg-preview.png"
              alt=""
              className="md:h-[5rem] md:w-[15rem]  h-0 w-0 dark:hidden block"
            />

            <img
              src="https://i.postimg.cc/tR6PyfHG/11zon-cropped-removebg-preview.png"
              alt=""
              className=" md:h-[5rem] md:w-[15rem] h-0 w-0 dark:block hidden  "
            /> */}
            {/* /// */}
            {/* <img
              src="https://i.postimg.cc/PJ184LM5/11zon-cropped-3-removebg-preview.png"
              alt=""
              className="md:h-0 md:w-0 xs:h-[3.5rem] xs:w-[3.5rem] h-[3rem] w-[3rem] block dark:hidden"
            />
            <img
              src="https://i.postimg.cc/C13qkCk2/11zon-cropped-4-removebg-preview.png"
              alt=""
              className="md:h-0 md:w-0 xs:h-[3.5rem] xs:w-[3.5rem] h-[3rem] w-[3rem] dark:block hidden"
            /> */}
            LOGO
          </Link>
        </motion.div>

        {/* Desktop Navbar */}
        <div className="hidden ss:flex gap-8 items-center">
          {NavLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `dark:hover:text-accent hover:text-secondary hover:font-semibold transition-colors ${
                    isActive ? "text-black dark:text-accent font-bold" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </motion.button>
          <CartIcon />

          <IconButton
            variant="text"
            className="ss:hidden text-inherit hover:bg-transparent focus:bg-transparent"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </IconButton>
        </div>
      </div>

      {/* Mobile Navbar */}
      <Collapse open={open}>
        <motion.div
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={navVariants}
          className="flex flex-col ss:hidden gap-4 mt-4 border-t border-secondary/10 dark:border-gray-800"
        >
          {NavLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <NavLink
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2 dark:hover:text-accent hover:text-secondary hover:font-semibold transition-colors ${
                    isActive ? "text-black dark:text-accent font-bold" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </motion.div>
          ))}
        </motion.div>
      </Collapse>
    </Navbar>
  );
}
