import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md"
    >
      <Link
        to="/"
        className="text-2xl font-bold text-gray-900 dark:text-white"
      >
        🎬 MovieApp
      </Link>

      <div className="flex items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm md:text-base font-medium transition ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `text-sm md:text-base font-medium transition ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300"
            }`
          }
        >
          Favorites
        </NavLink>

        <ThemeToggle />
      </div>
    </motion.nav>
  );
};

export default Navbar;