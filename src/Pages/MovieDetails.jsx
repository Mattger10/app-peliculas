import movies from "./movie.json";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieDetails.module.css";
import { Spinner } from "../Components/Spinner";
import youtube from "../assets/logoyoutube.webp";

export function MovieDetails() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const selectedMovie = movies.find(
      (movie) => movie.movieId === parseInt(movieId)
    );
    setIsLoading(false);
    console.log(selectedMovie);
  }, [movieId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!movieId) {
    return null;
  }

  const selectedMovie = movies.find(
    (movie) => movie.movieId === parseInt(movieId)
  );
  if (!selectedMovie) {
    return <div>Película no encontrada.</div>;
  }

  const imageUrl = selectedMovie.poster_path;
  const trailerUrl = selectedMovie.trailerUrl;
  const linkStream = selectedMovie.linkStream;
  const imageStream = selectedMovie.imageStream;
  const backgroundImage = selectedMovie.backgroundImage;

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
        <img
          className={`${styles.backgroundImage} ${styles.hideBackgroundImage}`}
          src={backgroundImage}
          alt=""
        />
      </div>
      <div className={styles.containerStream}>
        <img
          className={`${styles.column} ${styles.movieImage}`}
          src={imageUrl}
          alt={selectedMovie.title}
        />
        <a
          className={`${styles.streamButton} ${
            !linkStream && !imageStream
              ? styles.unavailableText
              : styles.streamTextBlack
          }`}
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
            {selectedMovie.title}
          </p>
          <p>
            <strong>Géneros:</strong>{" "}
            {selectedMovie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Fecha de estreno:</strong> {selectedMovie.released}
          </p>
          <p className={styles.description}>
            <strong>Descripción: </strong>
            {selectedMovie.overview}
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
