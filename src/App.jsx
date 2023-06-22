import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styles from "./App.module.css";
import { MovieDetails } from "./Pages/MovieDetails";
import { LandingPage } from "./Pages/LandingPage";
import { SeriesGrid } from "./Series/SeriesGrid";
import { SerieDetails } from "./Series/SerieDetails";
import { Search } from "./Components/Search";
import { NavBar } from "./Components/NavBar";
import { Carrusel } from "./Components/Carrusel";
import data from "./Components/Movies.json";
import { MoviesGrid } from "./Components/MoviesGrid";

export function App() {
  const [showSeriesGrid, setShowSeriesGrid] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const mockImagenes = data;

  return (
      <Router>
    <div className={darkMode ? styles.darkApp : styles.app}>
      <div className={styles.navBar}>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      
      
      </div>
        <header className={styles.centerContainer}>

         
      <div className={styles.buttonDark}>
      <input className={styles.input} type="checkbox" id="darkmode-toggle" />
      <label onClick={toggleDarkMode} className={styles.label} htmlFor="darkmode-toggle">
      </label>
    </div>
          
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={
              <div>
                <Search />
            <Carrusel imagenes={mockImagenes} darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            <MoviesGrid darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            <LandingPage />
            </div>
            } />
            <Route
              exact
              path="/movies/:movieId"
              element={<MovieDetails darkMode={darkMode} />}
            />

            <Route exact path="/series" element={<SeriesGrid />} />
            <Route exact path="/series/:serieId" element={<SerieDetails />} />
          </Routes>
        </main>
    </div>
      </Router>
  );
}
