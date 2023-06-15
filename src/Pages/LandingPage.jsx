import { MoviesGrid } from "../Components/MoviesGrid";
import { Search } from "../Components/Search";
import { useQuery } from "../hooks/useQuery";
import { SeriesGrid } from "../Series/SeriesGrid";


export function LandingPage () {
    const query = useQuery();
    const search = query.get("search");
    return (
        <div>
        <Search/>
        <MoviesGrid key={search} search={search}/>
        </div>
    )
}