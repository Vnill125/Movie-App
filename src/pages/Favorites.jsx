import React, { useState, useEffect } from "react";
import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";
import { motion } from "framer-motion";
import { Spinner } from "../components/Spinner";

export default function Favorites() {
  const { favorites } = useFavorites();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [favorites]);

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-white text-2xl font-bold mb-4">Your Favorite Movies</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : favorites.length === 0 ? (
        <p className="text-gray-400">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
