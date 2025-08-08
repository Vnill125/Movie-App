import { motion } from "framer-motion";

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <motion.form
      onSubmit={onSubmit}
      className="max-w-xl mx-auto mb-6 px-4 flex gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-3 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none shadow"
      />
      <button
        type="submit"
        className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded shadow"
      >
        Search
      </button>
    </motion.form>
  );
}