import React from "react";
import styles from "./Paginado.module.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function Paginado  ({ currentPage, itemsPerPage, totalItems, onPageChange, darkMode })  {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button 
          key={i}
          className={`${currentPage === i ? styles.activePage : styles.buttonNumber} ${darkMode ? styles.buttonNumberDark : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };


  return (
    <div className={styles.pagination}>
    <button className={darkMode ? styles.buttonAnteriorDark : styles.buttonAnterior}
      disabled={isFirstPage}
      onClick={() => handlePageChange(currentPage - 1)}
    >
     <ArrowBackIcon />
    </button>

    {renderPageNumbers()}

    <button className={darkMode ? styles.buttonAnteriorDark : styles.buttonAnterior}
      disabled={isLastPage}
      onClick={() => handlePageChange(currentPage + 1)}
    >
      <ArrowForwardIcon/>
    </button>
  </div>
  );
};


