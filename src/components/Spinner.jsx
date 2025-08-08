import { motion } from "framer-motion";

export const Spinner = () => (
  <motion.div
    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
    role="status"
    aria-label="Loading"
  />
);
