import { useState, useEffect } from "react";

import Loader from "../Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <main className={css.container}>
      <SearchBar />
      {isLoading && <Loader />}
      <MovieList movies={movies} />
    </main>
  );
}
