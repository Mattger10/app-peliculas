import { MoviesGrid } from "../Components/MoviesGrid";
import { Search } from "../Components/Search";
import { Carrusel } from "../Components/Carrusel";
import { useQuery } from "../hooks/useQuery";
import data from "../Components/Movies.json";


export function LandingPage () {
    const query = useQuery();
    const search = query.get("search");
    
    const mockImagenes = data;
    
    return (
        <div>
        <Search/>
        <Carrusel imagenes={mockImagenes}/>
        <MoviesGrid key={search} search={search}/>
        </div>
    )
}