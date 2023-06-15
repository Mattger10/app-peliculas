import { SeriesCard } from "./SeriesCard";
import series from "./Series.json";
import styles from "./SeriesGrid.module.css";
import { useEffect, useState } from "react";
import { Spinner } from "../Components/Spinner";
import { useQuery } from "../hooks/useQuery";
import { Empty } from "../Components/Empty";

export function SeriesGrid() {
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const query = useQuery();
  const search = query.get("search");

  useEffect(() => {
    setIsLoading(true);

    const filterSeries = () => {
      const filtered = series.filter((serie) => {
        const title = serie.title.toLowerCase();
        return title.includes(search.toLowerCase());
      });

      setFilteredSeries(filtered);
      setIsLoading(false);
    };

    if (search) {
      filterSeries();
    } else {
      setFilteredSeries(series);
      setIsLoading(false);
    }
  }, [search]);

  if (isLoading) {
    return <Spinner />;
  }

  if (filteredSeries.length === 0) {
    return search ? <Empty seriesName={search} /> : null;
  }

  return (
    <ul className={styles.seriesGrid}>
      {filteredSeries.map((serie) => (
        <SeriesCard key={serie.id} series={serie} />
      ))}
    </ul>
  );
}
