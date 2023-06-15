import styles from "./Empty.module.css"

export function Empty({ movieName }) {
    return <div className={styles.empty}>No tengo "{movieName}"</div>;
  }
  