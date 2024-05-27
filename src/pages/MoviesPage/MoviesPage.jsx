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
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieById(movieId) {
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
  }, []);

  return <></>;
}
