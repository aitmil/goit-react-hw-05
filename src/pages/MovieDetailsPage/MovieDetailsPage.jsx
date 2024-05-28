import { useEffect, useState, useRef, Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import { getMovieDetails } from "../../movies-api";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieById() {
      setIsLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        toast("Whoops. Something went wrong! Please try to reload this page!");
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieById();
  }, [movieId]);

  console.log(movie);
  console.log(movieId);

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      <MovieInfo movie={movie} />
      <Link to="/movies/:movieId/cast">
        <MovieCast />
      </Link>
      <Link to="/movies/:movieId/reviews">
        <MovieReviews />
      </Link>
    </div>
  );
}
