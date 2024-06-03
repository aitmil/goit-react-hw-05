import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { getMovieCredits } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setIsLoading(true);
        const data = await getMovieCredits(movieId);
        setMovieCast(data.cast);
      } catch (error) {
        toast.error(
          "Whoops. Something went wrong! Please try to reload this page!"
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <section>
      {isLoading && <Loader />}
      <ul className={css.list}>
        {movieCast.length > 0 &&
          movieCast.map(({ name, character, id, profile_path }) => (
            <li className={css.item} key={id}>
              <img
                className={css.img}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : defaultImg
                }
                width={150}
                alt={name}
              />
              <h4 className={css.name}>{name}</h4>
              <p className={css.character}>{character}</p>
            </li>
          ))}
      </ul>
      <Toaster
        toastOptions={{
          style: {
            padding: "16px",
            marginTop: "135px",
            textAlign: "center",
          },
        }}
      />
    </section>
  );
}
