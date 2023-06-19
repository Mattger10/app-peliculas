import React, { useState, useEffect } from "react";
import styles from "./Carrusel.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function Carrusel({ imagenes }) {
  const [imagenActual, setImagenActual] = useState(0);
  const imagenesFiltradas = imagenes.filter(
    (imagen) => imagen.carruselImg !== undefined
  );
  const cantidad = imagenesFiltradas.length;

  const siguienteImagen = () => {
    setImagenActual((imagenActual + 1) % cantidad);
  };

  const anteriorImagen = () => {
    setImagenActual((imagenActual - 1 + cantidad) % cantidad);
  };

  const obtenerSiguienteIndice = () => {
    if (imagenActual === cantidad - 1) {
      return 0; // Vuelve al principio del carrusel
    }
    return imagenActual + 1;
  };

  const obtenerAnteriorIndice = () => {
    if (imagenActual === 0) {
      return cantidad - 1; // Va al final del carrusel
    }
    return imagenActual - 1;
  };

  useEffect(() => {
    const intervalo = setInterval(siguienteImagen, 3000); // Cambia la imagen cada 3 segundos

    return () => {
      clearInterval(intervalo); // Limpia el intervalo cuando el componente se desmonta
    };
  }, [imagenActual]);

  if (!Array.isArray(imagenesFiltradas) || cantidad === 0) return null;

  return (
    <div className={styles.container}>
      <button className={styles.buttonBack} onClick={anteriorImagen}>
        <ArrowBackIosNewIcon fontSize="small" />
      </button>
      {imagenesFiltradas.map((imagen, index) => (
        <div
          className={
            imagenActual === index
              ? `${styles.slide} ${styles.active}`
              : styles.slide
          }
          key={index}
        >
          {imagenActual === index && (
            <img
              className={styles.image}
              src={imagen.carruselImg}
              alt="imagen"
            />
          )}
        </div>
      ))}
      <button className={styles.buttonNext} onClick={siguienteImagen}>
        <ArrowForwardIosIcon fontSize="small" />
      </button>
    </div>
  );
}
