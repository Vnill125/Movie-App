import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  const res = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      page,
    },
  });
  return res.data;
};

export const searchMovies = async (query, page = 1) => {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });
  return res.data;
};

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return res.json();
}

export async function getMovieVideos(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  return res.json();
}

export async function getMovieCredits(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  return res.json();
}

export async function getSimilarMovies(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  return res.json();
}

export async function getGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();
  return data.genres;
}

export async function getMoviesByGenre(genreId) {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  const data = await res.json();
  return data.results;
}