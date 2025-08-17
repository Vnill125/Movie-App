import React, { useState, useEffect } from "react";
import {
  getPopularMovies,
  searchMovies,
  getGenres,
  getMoviesByGenre,
} from "../api/tmdb";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { motion } from "framer-motion";
import { Spinner } from "../components/Spinner";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const genresData = await getGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        let data;

        if (query.trim()) {
          data = await searchMovies(query, page);
        } else if (selectedGenre) {
          data = await getMoviesByGenre(selectedGenre, page);
          data = { results: data, total_pages: 500 };
        } else {
          data = await getPopularMovies(page);
        }

        setResults(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query, selectedGenre, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setQuery("");
    setPage(1);
  };

  return (
    <div className="p-4">
      <SearchBar
        value={query}
        onChange={(val) => {
          setQuery(val);
          setSelectedGenre(null); 
          setPage(1);
        }}
      />

      <div className="flex flex-wrap justify-center gap-3 my-4">
  <button
    onClick={() => handleGenreChange(null)}
    className={`min-w-[90px] h-8 rounded-full font-semibold transition box-border border-2 px-3 flex items-center justify-center leading-none ${
      selectedGenre === null
        ? "bg-red-600 text-white border-red-600"
        : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-transparent hover:bg-gray-400 dark:hover:bg-gray-600"
    }`}
  >
    All
  </button>
  {genres.map((genre) => (
    <button
      key={genre.id}
      onClick={() => handleGenreChange(genre.id)}
      className={`min-w-[90px] h-8 rounded-full font-semibold transition box-border border-2 px-3 flex items-center justify-center leading-none ${
        selectedGenre === genre.id
          ? "bg-red-600 text-white border-red-600"
          : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-transparent hover:bg-gray-400 dark:hover:bg-gray-600"
      }`}
    >
      {genre.name}
    </button>
  ))}
</div>

      {loading ? (
        <div className="flex justify-center items-center h-64 mt-10">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
            {results.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded font-medium transition ${
                page === 1
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: 5 }, (_, i) => {
              const pageNumber = page - 2 + i;
              if (pageNumber < 1 || pageNumber > totalPages) return null;

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 rounded font-medium transition border ${
                    pageNumber === page
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded font-medium transition ${
                page === totalPages
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
