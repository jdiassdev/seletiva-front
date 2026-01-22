import axios from "axios";

const TMDB_TOKEN =
  process.env.NEXT_PUBLIC_TMDB_TOKEN ??
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjQxMmI5ZGFlNGJhYzVmMDg4ZWMyYjc4MzNlMzkyMyIsIm5iZiI6MTc2OTAzODc1NC43MDcsInN1YiI6IjY5NzE2M2EyYjZjNzZkOGNiMDc3NDYxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OrS825kTj5c2D9SZdgRPiPczvBHCLRmgTtHhNav6Eyg";
const BASE_URL = "https://api.themoviedb.org/3";

const apiFilms = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await apiFilms.get("/movie/popular", {
      params: {
        language: "pt-BR",
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
    throw error;
  }
};

export const searchMovies = async (query: any, pageNum: number) => {
  try {
    const response = await apiFilms.get("/search/movie", {
      params: {
        query: query,
        language: "pt-BR",
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMovieDetails = async (movieId: any) => {
  try {
    const response = await apiFilms.get(`/movie/${movieId}`, {
      params: { language: "pt-BR" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiFilms;
