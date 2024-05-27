import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li className={css.item} key={movie.id}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultImg
            }
            width={180}
            alt="poster"
          ></img>
        </li>
      ))}
    </ul>
  );
}
