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
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get("searchFilter") ?? "";

  useEffect(() => {
    if (!searchFilter) return;
    const fetchFilteredMovies = async () => {
      try {
        setIsLoading(true);
        const data = await searchMovies(searchFilter);
        setFilteredMovies(data);
        if (!data.results.length) {
          setIsError(true);
          toast.error(
            "There are no movies with this request. Please, try again"
          );
          return;
        }
      } catch (error) {
        setIsError(true);
        toast("Whoops. Something went wrong! Please try to reload this page!");
      } finally {
        setIsLoading(false);
        setIsError(false);
      }
    };
    fetchFilteredMovies();
  }, [searchFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSearchFilter = e.currentTarget.elements.movieName.value.trim();
    if (!newSearchFilter) {
      toast.error("Please enter a keyword!");
      return;
    }
    setSearchParams({ searchFilter: newSearchFilter });
    e.currentTarget.reset();
  };

  return (
    <main className={css.container}>
      <SearchBar onSearch={handleSubmit} />
      {isLoading && <Loader />}
      {isError && (
        <p>There is no movies with this request. Please, try again</p>
      )}
      <MovieList movies={filteredMovies} />
      <Toaster />
    </main>
  );
}
