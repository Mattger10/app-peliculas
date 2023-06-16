import series from "./serie.json";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SerieDetails.module.css";
import { Spinner } from "../Components/Spinner";
import youtube from "../assets/logoyoutube.webp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

export function SerieDetails() {
  const { serieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  const handlePlayTrailer = () => {
    setIsTrailerPlaying(true);
  };

  useEffect(() => {
    setIsLoading(true);

    const selectedSerie = series.find(
      (serie) => serie.serieId === parseInt(serieId)
    );
    setIsLoading(false);
    console.log(selectedSerie);
  }, [serieId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!serieId) {
    return null;
  }

  const selectedSerie = series.find(
    (serie) => serie.serieId === parseInt(serieId)
  );
  if (!selectedSerie) {
    return <div>Película no encontrada.</div>;
  }

  const imageUrl = selectedSerie.poster_path;
  const trailerUrl = selectedSerie.trailerUrl;
  const linkStream = selectedSerie.linkStream;
  const imageStream = selectedSerie.imageStream;
  const backgroundImage = selectedSerie.backgroundImage;

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
          alt={selectedSerie.title}
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
            {selectedSerie.title}
          </p>
          <p>
            <strong>Géneros:</strong>{" "}
            {selectedSerie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Fecha de estreno:</strong> {selectedSerie.released}
          </p>
          <p className={styles.description}>
            <strong>Descripción: </strong>
            {selectedSerie.overview}
          </p>
          <PlayCircleIcon fontSize="large" />
          <div>
            <button
              className={styles.verTrailerButton}
              onClick={() => {
                setIsModalOpen(true);
                handlePlayTrailer();
              }}
            >
              Reproducir trailer
            </button>
          </div>

          {isModalOpen && (
            <div className={styles.containerModal}>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
