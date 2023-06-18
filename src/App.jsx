import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styles from "./App.module.css";
import { MovieDetails } from "./Pages/MovieDetails";
import { LandingPage } from "./Pages/LandingPage";
import { SeriesGrid } from "./Series/SeriesGrid";
import { SerieDetails } from "./Series/SerieDetails";
import { Search } from "./Components/Search";
import { NavBar } from "./Components/NavBar";

export function App() {
  const [showSeriesGrid, setShowSeriesGrid] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? styles.darkApp : styles.app}>
      <div className={styles.navBar}>
      <NavBar/>

      </div>
      <Router>
        <header className={styles.centerContainer}>
          {/* <Link to="/" >
            <h1
              style={{ fontFamily: "HighVoltage Heavy Rough" }}
              className={darkMode ? styles.title1Dark : styles.title1}
            >
              PELÍCULAS
            </h1>
          </Link>
          <Link
            to="/series"
            onClick={() => setShowSeriesGrid(true)}
            
          >
            <h1
              style={{ fontFamily: "HighVoltage Heavy Rough" }}
              className={darkMode ? styles.titleDark : styles.title}
            >
              SERIES
            </h1>
          </Link> */}
         
      <div className={styles.buttonDark}>
      <input className={styles.input} type="checkbox" id="darkmode-toggle" />
      <label onClick={toggleDarkMode} className={styles.label} htmlFor="darkmode-toggle">
      </label>
    </div>
          
        </header>
        <main>
          <Routes>
            <Route
              exact
              path="/movies/:movieId"
              element={<MovieDetails darkMode={darkMode} />}
            />

            <Route exact path="/series" element={<SeriesGrid />} />
            <Route exact path="/series/:serieId" element={<SerieDetails />} />
            <Route exact path="/" element={<LandingPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}
