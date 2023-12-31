import { MovieCard } from "./MovieCard";
import movies from "./Movies.json";
import styles from "./MoviesGrid.module.css";
import { useEffect, useState, useRef } from "react";
import { Spinner } from "./Spinner";
import { useQuery } from "../hooks/useQuery";
import { Empty } from "./Empty";
import { Paginado } from "./Paginado";

export function MoviesGrid({darkMode}) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [search, setSearch] = useState("");
  const moviesGridRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18; // Ajusta la cantidad de elementos por página según tus necesidades
  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
      if (moviesGridRef.current) {
        moviesGridRef.current.scrollIntoView({ behavior: "smooth" });
      }
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
      <button className={darkMode ? styles.buttonDark : styles.button} onClick={() => {window.location.reload();}}>Todos</button>

      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("recientes");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Recientes</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("acción");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Acción</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("aventura");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Aventura</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("animación");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Animación</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("comedia");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Comedia</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("crimen");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Crimen</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("drama");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Drama</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("fantasía");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Fantasía</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("familia");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Familia</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("marvel");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Marvel</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("misterio");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Misterio</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("música");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Música</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("romance");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Romance</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("suspenso");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Suspenso</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("terror");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>Terror</button>
      <button className={darkMode? styles.buttonDark : styles.button} onClick={() => {setSelectedGenre("ciencia ficción");moviesGridRef.current.scrollIntoView({ behavior: "smooth" });}}>
        Ciencia ficción
      </button>
      </div>
<div className={styles.prueba}>
      <ul ref={moviesGridRef} className={styles.moviesGrid}>
  {currentItems.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ))}
</ul>

</div>

<div className={styles.paginado}>
      <Paginado
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredMovies.length}
        onPageChange={handlePageChange}
        darkMode={darkMode}
      />
</div>
    </div>
  );
}
