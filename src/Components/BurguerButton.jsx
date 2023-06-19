import React from "react";
import styles from "./BurguerButton.module.css";

export function BurguerButton(props) {
  const handleClick = () => {
    props.handleClick();
  };

  const buttonClasses = `${styles.navIcon6} ${props.clicked ? styles.open : ""}`;

  return (
    <div>
      <div onClick={handleClick} className={buttonClasses}>
        <span className={styles.span}></span>
        <span className={styles.span}></span>
        <span className={styles.span}></span>
        
      </div>
    </div>
  );
}


// className={`${styles.links} ${clicked ? styles.active : ''}`}