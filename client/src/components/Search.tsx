import { useEffect, useState } from "react";
import "./Search.css";
import "./Movies.css";

function Search() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState([]); // Stocke la liste des genres

  useEffect(() => {
    // Récupérer les films
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=01e787d764d61219a648b30bc425cdc9&language=fr-FR",
    )
      .then((response) => response.json())
      .then((json) => setMovies(json.results));

    // Récupérer les genres
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=01e787d764d61219a648b30bc425cdc9&language=fr-FR",
    )
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredDatas = movies.filter((data: { title: string }) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="Recherchez selon votre vibe"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="search_result">
        {filteredDatas.map(
          (data: { id: number; title: string; poster_path: string }) => {
            return (
              <div className="search_results" key={data.id}>
                <div className="button-container">
                  <button className="favorite-button" type="button">
                    ★
                  </button>
                  <button className="add-button" type="button">
                    ✔︎
                  </button>
                  <button className="like-button" type="button">
                    👍🏼
                  </button>
                  <button className="dislike-button" type="button">
                    👎🏼
                  </button>
                </div>

                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.title}
                />
              </div>
            );
          },
        )}
      </div>
    </>
  );
}

export default Search;
