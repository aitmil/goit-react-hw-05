import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { searchMovies } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get("searchFilter") ?? "";

  useEffect(() => {
    if (!searchFilter) return;
    const fetchFilteredMovies = async () => {
      try {
        setIsLoading(true);
        const data = await searchMovies(searchFilter);
        setFilteredMovies(data.results);
        if (!data.results.length) {
          toast.error(
            "There are no movies with this request. Please, try again"
          );
          return;
        }
      } catch (error) {
        toast.error(
          "Whoops. Something went wrong! Please try to reload this page!"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilteredMovies();
  }, [searchFilter]);

  const changeSearchFilter = (newSearchFilter) => {
    searchParams.set("searchFilter", newSearchFilter);
    setSearchParams(searchParams);
  };

  return (
    <main className={css.container}>
      <SearchBar filter={searchFilter} onSearch={changeSearchFilter} />
      {isLoading && <Loader />}
      <MovieList movies={filteredMovies} />
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
