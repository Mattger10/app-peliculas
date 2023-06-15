import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";
import placeholder from "../placeholder.jpg"

export function MovieCard({ movie }) {
  // const imageUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
  const imageUrl = movie.poster_path ?  movie.poster_path : placeholder;

  return (
    <li className={styles.movieCard}>
      <Link to={"/movies/" + movie.id}>
      <img
        width={230}
        height={345}
        className={styles.movieImage}
        src={imageUrl}
        alt={movie.title}
      />
      </Link>
      <div className={styles.title}>{movie.title}</div>
    </li>
  );
}
