import { MovieCard } from "./MovieCard";
import movies from "./Movies.json";
import styles from "./MoviesGrid.module.css";
import { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import { useQuery } from "../hooks/useQuery";
import { Empty } from "./Empty";

export function MoviesGrid() {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [search, setSearch] = useState("");

  const query = useQuery();
  const querySearch = query.get("search");

  const filterMovies = () => {
    const filtered = movies.filter((movie) => {
      const title = movie.title.toLowerCase();
      const genre = movie.genre || [];
      const lowercaseGenre = genre.map((genre) => genre.toLowerCase());
      const isGenreMatch =
        selectedGenre === "" ||
        lowercaseGenre.includes(selectedGenre.toLowerCase());
      return isGenreMatch;
    });

    setFilteredMovies(filtered);
    setIsLoading(false);
  };

  function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const searchMovies = () => {
    if (search) {
      const searched = filteredMovies.filter((movie) => {
        const titleWithoutAccents = removeAccents(movie.title.toLowerCase());
        const searchWithoutAccents = removeAccents(search.toLowerCase());
        const isTitleMatch = titleWithoutAccents.includes(searchWithoutAccents);
        return isTitleMatch;
      });
  
      setFilteredMovies(searched);
    }
  };

  useEffect(() => {
    setIsLoading(true);
  
    if (querySearch || selectedGenre) {
      setSearch(querySearch);
      filterMovies();
    } else {
      movies.sort((a, b) => a.title.localeCompare(b.title));
      setFilteredMovies(movies);
      setIsLoading(false);
    }
  }, [querySearch, selectedGenre]);
  

  useEffect(() => {
    searchMovies();
  }, [search]);

  if (isLoading) {
    return <Spinner />;
  }

  if (filteredMovies.length === 0) {
    return search ? <Empty movieName={search} /> : null;
  }

  

  return (
    <div>
      <div className={styles.buttonBorders}>
      <button className={styles.button} onClick={() => setSelectedGenre("")}>Todos</button>
      <button className={styles.button} onClick={() => setSelectedGenre("acción")}>Acción</button>
      <button className={styles.button} onClick={() => setSelectedGenre("aventura")}>Aventura</button>
      <button className={styles.button} onClick={() => setSelectedGenre("animación")}>Animación</button>
      <button className={styles.button} onClick={() => setSelectedGenre("comedia")}>Comedia</button>
      <button className={styles.button} onClick={() => setSelectedGenre("crimen")}>Crimen</button>
      <button className={styles.button} onClick={() => setSelectedGenre("drama")}>Drama</button>
      <button className={styles.button} onClick={() => setSelectedGenre("fantasía")}>Fantasía</button>
      <button className={styles.button} onClick={() => setSelectedGenre("familia")}>Familia</button>
      <button className={styles.button} onClick={() => setSelectedGenre("marvel")}>Marvel</button>
      <button className={styles.button} onClick={() => setSelectedGenre("misterio")}>Misterio</button>
      <button className={styles.button} onClick={() => setSelectedGenre("música")}>Música</button>
      <button className={styles.button} onClick={() => setSelectedGenre("romance")}>Romance</button>
      <button className={styles.button} onClick={() => setSelectedGenre("suspenso")}>Suspenso</button>
      <button className={styles.button} onClick={() => setSelectedGenre("terror")}>Terror</button>
      <button className={styles.button} onClick={() => setSelectedGenre("ciencia ficción")}>
        Ciencia ficción
      </button>
      </div>

      <ul className={styles.moviesGrid}>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
