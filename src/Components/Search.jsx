import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";

export function Search() {
  const navigate = useNavigate();
  const query = useQuery();
  const search = query.get("search");
  const [inputValue, setInputValue] = useState(search || "");

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
    if (inputValue === "") {
      navigate("/");
    }
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
