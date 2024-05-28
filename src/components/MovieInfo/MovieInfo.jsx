import css from "./MovieInfo.module.css";

export default function MovieInfo({ movie }) {
  const { poster_path, title, vote_average, overview, genres } = movie;
  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

  return (
    <div className={css.infoWrapper}>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : defaultImg
        }
        width={250}
        alt="poster"
      ></img>
      <div className={css.info}>
        <h2 className={css.title}>{title}</h2>
        <p>User score: {vote_average}</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        <p>{genres.map((genre) => genre.name)}</p>
      </div>
    </div>
  );
}
