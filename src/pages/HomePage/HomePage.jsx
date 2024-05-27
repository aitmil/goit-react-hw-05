import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import getMoviesList from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      try {
        const { results } = await getMoviesList();
        setMovies(results);
      } catch (error) {
        toast("Whoops. Something went wrong! Please try to reload this page!");
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <main>
      <h1 className={css.title}>Trending Movies</h1>
      <MovieList movies={movies} />
    </main>
  );
}
