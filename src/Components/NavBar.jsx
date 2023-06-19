import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { BurguerButton } from "./BurguerButton";
import { Link } from "react-router-dom";
import { Search } from "./Search";
import logo  from "../assets/LogoMattger.png"

export function NavBar() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav className={styles.NavContainer}>
        <Link
          style={{ fontFamily: "HighVoltage Heavy Rough" }}
          className={styles.h2}
          to="/"
        >
          <img className={styles.logo} src={logo} alt="" />
        </Link>

        <div className={`${styles.links} ${clicked ? styles.linksActive : ""}`}>
          <Link
            style={{ fontFamily: "HighVoltage Heavy Rough" }}
            className={styles.a}
            to="/"
            onClick={() => setClicked(false)}
          >
            PELÍCULAS
          </Link>
          <Link
            style={{ fontFamily: "HighVoltage Heavy Rough" }}
            className={styles.a}
            to="/series"
            onClick={() => setClicked(false)}
          >
            SERIES
          </Link>
        </div>
        <div className={styles.burguer}>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <div
          className={`initial ${styles.BgDiv} ${clicked ? styles.active : ""}`}
        ></div>
      </nav>
    </>
  );
}

// className={`${styles.links} ${clicked ? styles.active : ''}`}
