import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MovieCard({ movie }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const toggleFavorite = () => {
    isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white dark:bg-gray-800 p-2 rounded relative shadow-md cursor-pointer mb-3"
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          src={image}
          alt={movie.title}
          className="w-full h-auto mb-2 rounded"
        />
        <h3 className="text-gray-900 dark:text-white text-lg font-bold">
          {movie.title}
        </h3>
      </Link>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
        Rating: {movie.vote_average.toFixed(1)}
      </p>
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 transition hover:scale-110 bg-black/50 dark:bg-white/10 text-white rounded-full w-10 h-10 flex items-center justify-center"
      >
        {isFavorite(movie.id) ? (
          <span className="text-red-500 animate-pulse">❤️</span>
        ) : (
          <span className="text-white dark:text-white">🤍</span>
        )}
      </button>
    </motion.div>
  );
}
