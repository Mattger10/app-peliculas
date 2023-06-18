import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { BurguerButton } from './BurguerButton';

export function NavBar() {

    const[clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked)
    }

    return (
        <>
            <nav className={styles.NavContainer}>
                <h2 style={{ fontFamily: "HighVoltage Heavy Rough" }} className={styles.h2}>Mattger</h2>
                
                <div className={`${styles.links} ${clicked ? styles.linksActive : ''}`}>
                    <a style={{ fontFamily: "HighVoltage Heavy Rough" }} className={styles.a} href="/">PELÍCULAS</a>
                    <a style={{ fontFamily: "HighVoltage Heavy Rough" }} className={styles.a} href="/series">SERIES</a>
                </div>
                <div className={styles.burguer}>
                    <BurguerButton clicked={clicked} handleClick={handleClick}/>
                </div>
                <div className={`initial ${styles.BgDiv} ${clicked ? styles.active : ''}`}></div>
            </nav>
        </>
    )
}

// className={`${styles.links} ${clicked ? styles.active : ''}`}