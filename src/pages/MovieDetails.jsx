import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieVideos, getMovieCredits, getSimilarMovies } from "../api/tmdb";
import { motion } from "framer-motion";
import { Spinner } from "../components/Spinner";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const [details, videos, credits, similar] = await Promise.all([
        getMovieDetails(id),
        getMovieVideos(id),
        getMovieCredits(id),
        getSimilarMovies(id)
      ]);

      setMovie(details);

      const trailer = videos.results.find((vid) => vid.type === "Trailer");
      if (trailer) setTrailerKey(trailer.key);

      setCast(credits.cast.slice(0, 8));
      setSimilarMovies(similar.results.slice(0, 6));
    }

    fetchAll();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-4 space-y-10"
    >
      <motion.div
        className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
          className="w-full md:w-1/3 object-cover"
        />
        <div className="p-4 flex-1 text-gray-900 dark:text-white">
          <motion.h2
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            viewport={{ once: true }}
          >
            {movie.title}
          </motion.h2>
          <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">
            {movie.release_date} • {movie.runtime} min
          </p>
          <motion.p
            className="mb-4 text-gray-800 dark:text-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
          >
            {movie.overview}
          </motion.p>
          <p className="text-yellow-500 font-semibold">
            Rating: {movie.vote_average.toFixed(1)} / 10
          </p>
        </div>
      </motion.div>

      {trailerKey && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-md"
        >
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </motion.div>
      )}

      {cast.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Cast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "https://via.placeholder.com/185x278?text=No+Image"
                  }
                  alt={actor.name}
                  className="w-full h-auto rounded-lg shadow"
                />
                <p className="mt-2 text-sm dark:text-gray-300">{actor.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {similarMovies.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            Similar Movies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {similarMovies.map((sim) => (
              <Link to={`/movie/${sim.id}`} key={sim.id}>
                <img
                  src={
                    sim.poster_path
                      ? `https://image.tmdb.org/t/p/w342${sim.poster_path}`
                      : "https://via.placeholder.com/342x513?text=No+Image"
                  }
                  alt={sim.title}
                  className="w-full h-auto rounded-lg shadow hover:scale-105 transition duration-200"
                />
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
