import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import "./Movies.css";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

function Search() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les films
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=01e787d764d61219a648b30bc425cdc9",
    )
      .then((response) => response.json())
      .then((json) => setMovies(json.results));
  });

  // Gère la recherche
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Ajoute ou retire un film des favoris
  const toggleFavorite = (movie: Movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  // Filtre les films
  const filteredDatas = movies.filter((data) =>
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
        {filteredDatas.map((data) => (
          <div className="search_results" key={data.id}>
            <div className="button-container">
              <button
                className={`favorite-button ${
                  favorites.some((fav) => fav.id === data.id) ? "active" : ""
                }`}
                type="button"
                onClick={() => toggleFavorite(data)}
              >
                {favorites.some((fav) => fav.id === data.id)
                  ? "★ Retirer"
                  : "☆ Ajouter"}

                <button className="add-button" type="button">
                  ✔︎
                </button>
                <button className="like-button" type="button">
                  👍🏼
                </button>
              </button>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
            />
            <p>{data.title}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="view-favorites-button"
        onClick={() => navigate("/favorites")}
      >
        Voir mes favoris
      </button>
    </>
  );
}

export default Search;
