import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-6xl font-bold text-red-600 dark:text-red-400 mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        404
      </motion.h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition"
      >
        Go back home
      </Link>
    </motion.div>
  );
}
