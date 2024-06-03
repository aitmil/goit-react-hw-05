import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import getMoviesList from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const { results } = await getMoviesList();
        setMovies(results);
      } catch (error) {
        toast("Whoops. Something went wrong! Please try to reload this page!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <main className={css.container}>
      <h1 className={css.title}>Trending Movies Today</h1>
      <MovieList movies={movies} />
      {isLoading && <Loader />}
      <Toaster
        toastOptions={{
          style: {
            padding: "16px",
            color: "red",
            marginTop: "135px",
            textAlign: "center",
          },
        }}
      />
    </main>
  );
}
