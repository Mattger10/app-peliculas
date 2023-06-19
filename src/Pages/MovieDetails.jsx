import movies from "./movie.json";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieDetails.module.css";
import { Spinner } from "../Components/Spinner";
import youtube from "../assets/logoyoutube.webp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useMediaQuery } from "react-responsive";
import { Search } from "../Components/Search";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export function MovieDetails() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handlePlayTrailer = () => {
    setIsTrailerPlaying(true);
  };

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
  const backgroundImageMobile = selectedMovie.backgroundImageMobile;

  let streamText;
  if (!linkStream && !imageStream) {
    streamText = "No disponible online";
  } else {
    streamText = "Ver online en:";
  }

  const Modal = ({ onClose, children }) => {
    const handleClose = () => {
      onClose();
      setIsTrailerPlaying(false);
    };

    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          {children}
          <button className={styles.buttonX} onClick={handleClose}>
            X
          </button>
          <p className={styles.pTrailer}>Reproducir trailer</p>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${styles.detailsContainer} ${
        isTrailerPlaying ? styles.darkBackground : ""
      }`}
    >
      <div
        className={`${styles.backgroundImage} ${
          isMobile ? styles.backgroundImageMobile : styles.hideBackgroundImage
        }`}
      >
        <img
          className={`${styles.backgroundImage} ${
            isMobile ? styles.backgroundImageMobile : styles.hideBackgroundImage
          }`}
          src={isMobile ? backgroundImageMobile : backgroundImage}
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
          style={{ fontFamily: "KGRedHands" }}
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
          <PlayCircleIcon fontSize="large" />
          <div>
            <p
              className={styles.verTrailerButton}
              onClick={() => {
                setIsModalOpen(true);
                handlePlayTrailer();
              }}
            >
              Reproducir trailer
            </p>
          </div>
            <div className={styles.buttonAtras}>
              
              <Link to="/">
                <p className={styles.pAtras}>Volver</p>
              </Link>
            </div>
          <div
            className={`${styles.containerModal} ${
              isModalOpen ? styles.visible : ""
            }`}
            onClick={() => setIsModalOpen(false)}
          >
            {isModalOpen && (
              <Modal onClose={() => setIsModalOpen(false)}>
                <iframe
                  className={styles.modalVideo}
                  src={trailerUrl}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
