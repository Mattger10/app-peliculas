import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import { MoviesGrid } from "./Components/MoviesGrid";
import styles from "./App.module.css";
import { MovieDetails } from "./Pages/MovieDetails";
import { LandingPage } from "./Pages/LandingPage";
import { SeriesGrid } from "./Series/SeriesGrid";
import { SerieDetails } from "./Series/SerieDetails";

export function App() {
  const [showSeriesGrid, setShowSeriesGrid] = useState(false);

  return (
    <Router>
      <header className={styles.centerContainer}>
        <Link to="/" className={styles.flexContainer}>
          <h1 style={{ fontFamily: 'HighVoltage Heavy Rough' }} className={styles.title1}>PELÍCULAS</h1>
        </Link>
        <Link
          to="/series"
          onClick={() => setShowSeriesGrid(true)}
          className={styles.flexContainer}
        >
          <h1 style={{ fontFamily: 'HighVoltage Heavy Rough' }} className={styles.title}>SERIES</h1>
        </Link>
      </header>
      <main>
      <Routes>
  <Route exact path="/movies/:movieId" element={<MovieDetails />} />
  <Route exact path="/series" element={<SeriesGrid />} />
  <Route exact path="/series/:serieId" element={<SerieDetails />} />
  <Route exact path="/" element={<LandingPage />} />
</Routes>
      </main>
    </Router>
  );
}
