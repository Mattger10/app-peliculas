import series from "./serie.json";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SerieDetails.module.css";
import { Spinner } from "../Components/Spinner";
import youtube from "../assets/logoyoutube.webp";

export function SerieDetails() {
  const { serieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const selectedSeries = series.find(
      (serie) => serie.serieId === parseInt(serieId)
    );
    setIsLoading(false);
    console.log(selectedSeries);
  }, [serieId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!serieId) {
    return null;
  }

  const selectedSeries = series.find(
    (serie) => serie.serieId === parseInt(serieId)
  );
 

  const imageUrl = selectedSeries.poster_path;
  const trailerUrl = selectedSeries.trailerUrl;
  const linkStream = selectedSeries.linkStream;
  const imageStream = selectedSeries.imageStream;
  const backgroundImage = selectedSeries.backgroundImage;

  let streamText;
  if (!linkStream && !imageStream) {
    streamText = "No disponible online";
  } else {
    streamText = "Ver online en:";
  }

  return (
    <div className={styles.detailsContainer}>
      <div
        className={`${styles.backgroundImage} ${styles.hideBackgroundImage}`}
      >
        <img className={`${styles.backgroundImage} ${styles.hideBackgroundImage}`} src={backgroundImage} alt="" />
      </div>
      <div className={styles.containerStream}>
        <img
          className={`${styles.column} ${styles.movieImage}`}
          src={imageUrl}
          alt={selectedSeries.title}
        />
        <a
          className={`${styles.streamButton} ${!linkStream && !imageStream ? styles.unavailableText : styles.streamTextBlack}`}
          href={linkStream ? linkStream : null}
          target="_blank"
          rel="noopener noreferrer"
        >
          {streamText}
        </a>

        {linkStream && imageStream && (
          <a href={linkStream} target="_blank" rel="noopener noreferrer">
            <img className={styles.streamLogo} src={imageStream} alt="Logo" />
          </a>
        )}
      </div>
      <div className={`${styles.column} ${styles.movieDetails}`}>
        <div className={styles.containerData}>
          <p className={styles.firstItem}>
            <strong>Título: </strong>
            {selectedSeries.title}
          </p>
          <p>
            <strong>Géneros:</strong>{" "}
            {selectedSeries.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Fecha de estreno:</strong> {selectedSeries.released}
          </p>
          <p className={styles.description}>
            <strong>Descripción: </strong>
            {selectedSeries.overview}
          </p>

          <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
            <img
              className={styles.youtubeLogo}
              src={youtube}
              alt="YouTube Logo"
            />
          </a>
          <a
            className={styles.trailerButton}
            href={trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver tráiler en YouTube
          </a>
        </div>
      </div>
    </div>
  );
}