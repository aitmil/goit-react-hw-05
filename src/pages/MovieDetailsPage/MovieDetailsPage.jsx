import { useEffect, useState, useRef, Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";
import clsx from "clsx";

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
  const backLinkHref = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchMovieById() {
      try {
        setIsLoading(true);
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

  const getLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <main className={css.container}>
      <Link to={backLinkHref.current} className={css.backLink}>
        <HiArrowLeft /> Go back
      </Link>
      {isLoading && <Loader />}
      {movie && <MovieInfo movie={movie} />}
      <ul className={css.listLinks}>
        <li className={css.itemLink}>
          <NavLink
            className={getLinkClass}
            to="cast"
            state={{ ...location.state }}
          >
            Cast
          </NavLink>
        </li>
        <li className={css.itemLink}>
          <NavLink
            className={getLinkClass}
            to="reviews"
            state={{ ...location.state }}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={isLoading && <Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
}
