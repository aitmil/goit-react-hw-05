import axios from "axios";

const myApiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmI2YjI3NGRlYjExNTE2MjdlYTU2ZTE2YzY4NTExZCIsInN1YiI6IjY2NTRhMWZlMjRhYWUyMmQxNDA2YWZhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GP9eQbWsFkh6AF4NZB7coe5mPGKuXAyLNBlR2sO-xD8";

axios.defaults.headers.common["Authorization"] = `Bearer ${myApiKey}`;
axios.defaults.baseURL = "https://api.themoviedb.org/";

export default async function getMoviesList() {
  const response = await axios.get("/3/trending/movie/day?language=EN");
  return response.data;
}

export const searchMovies = async (query) => {
  const response = await axios.get(
    "/3/search/movie?include_adult=true&language=EN",
    { params: { query: query } }
  );
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/3/movie/${movieId}?language=EN`);
  return response.data;
};
console.log(getMovieDetails(5));

export const getMovieCredits = async (movieId) => {
  const response = await axios.get("/3/movie/movie_id/credits?language=EN", {
    params: { movie_id: movieId },
  });
  return response.data;
};

export const getMoviesReviews = async (movieId) => {
  const response = await axios.get("/3/movie/movie_id/reviews?language=EN", {
    params: { movie_id: movieId },
  });
  return response.data;
};
