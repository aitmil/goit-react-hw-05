import { Link, useLocation } from "react-router-dom";
import css from "./MovieItem.module.css";

export default function MovieDetails({ movie: { id, poster_path } }) {
  const location = useLocation();
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <Link to={`/movies/${id}`} state={location}>
      <img
        className={css.img}
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : defaultImg
        }
        width={180}
        alt="poster"
      ></img>
    </Link>
  );
}
