import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { getMoviesReviews } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setIsLoading(true);
        const data = await getMoviesReviews(movieId);
        setMovieReviews(data.results);
      } catch (error) {
        toast("Whoops. Something went wrong! Please try to reload this page!");
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieReviews();
  }, [movieId]);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <>
      {isLoading && <Loader />}
      <ul className={css.list}>
        {movieReviews.length > 0 &&
          movieReviews.map(
            ({ id, author, content, author_details: { avatar_path } }) => (
              <li className={css.item} key={id}>
                <div className={css.author}>
                  <img
                    className={css.img}
                    src={
                      avatar_path
                        ? `https://image.tmdb.org/t/p/w500${avatar_path}`
                        : defaultImg
                    }
                    width={50}
                    alt={author}
                  />
                  <h4 className={css.name}>{author}</h4>
                </div>
                <p className={css.text}>{content}</p>
              </li>
            )
          )}
      </ul>
      <Toaster />
    </>
  );
}
