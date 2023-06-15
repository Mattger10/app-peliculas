import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";

export function Search() {
  const navigate = useNavigate();
  const query = useQuery();
  const searchParam = query.get("search");
  const [inputValue, setInputValue] = useState(searchParam || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/?search=" + inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
      setInputValue(inputValue + " ");
    }
  };

  useEffect(() => {
    if (searchParam !== inputValue) {
      setInputValue(searchParam || "");
    }
  }, [searchParam]);

  useEffect(() => {
    let timer = null;
    
    const handleInputChange = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (inputValue === "") {
          navigate("/");
        } else {
          navigate("/?search=" + inputValue);
        }
      }, 500); // Ajusta el tiempo de espera según tus necesidades
    };

    handleInputChange();

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, navigate]);

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar película..."
        />
        <FaSearch color="black" size={20} className={styles.searchButton} />
      </div>
    </form>
  );
}

