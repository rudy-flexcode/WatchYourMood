import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

function Search() {
  const [datas, setDatas] = useState<Movie[]>([]); // Liste des films récupérés
  const [searchTerm, setSearchTerm] = useState(""); // Terme de recherche
  const [favorites, setFavorites] = useState<Movie[]>([]); // Films favoris

  const navigate = useNavigate(); // Pour rediriger vers la page des favoris

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=768962ec35ca457ffbe6714ba8be24e8",
    )
      .then((response) => response.json())
      .then((json) => setDatas(json.results));
  }, []);

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

  // Filtre les films selon le terme de recherche
  const filteredDatas = datas.filter((data) =>
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
