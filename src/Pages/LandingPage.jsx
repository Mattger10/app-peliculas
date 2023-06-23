import { MoviesGrid } from "../Components/MoviesGrid";
import { Search } from "../Components/Search";
import { Carrusel } from "../Components/Carrusel";
import { useQuery } from "../hooks/useQuery";
import data from "../Components/Movies.json";
import { useState } from "react";



export function LandingPage () {
    const query = useQuery();
    const search = query.get("search");
    
    const mockImagenes = data;

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };
    
    return (
        <div>
        {/* <Search/> */}
        
        {/* <MoviesGrid key={search} search={search} darkMode={darkMode} toggleDarkMode={toggleDarkMode}/> */}
        </div>
    )
}