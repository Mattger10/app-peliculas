import styles from "./SeriesCard.module.css";
import { Link } from "react-router-dom";
import series_placeholder from "../placeholder.jpg";

export function SeriesCard({ series }) {
  const imageUrl = series.poster_path ? series.poster_path : series_placeholder;

  return (
    <li className={styles.seriesCard}>
      <Link to={"/series/" + series.id}>
        <img
          width={230}
          height={345}
          className={styles.seriesImage}
          src={imageUrl}
          alt={series.title}
        />
      </Link>
      <div>{series.title}</div>
    </li>
  );
}
