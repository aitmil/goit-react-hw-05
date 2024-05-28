import { useEffect, useState, useRef, Suspense } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";

import { getMovieDetails } from "../../movies-api";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state ?? "/movies";

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
    <main className={css.container}>
      <Link to={backLinkHref} className={css.backLink}>
        <HiArrowLeft /> Back to movies
      </Link>
      {isLoading && <Loader />}
      <MovieInfo movie={movie} />
      <Link to="cast">
        <MovieCast />
      </Link>
      <Link to="reviews">
        <MovieReviews />
      </Link>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
}
