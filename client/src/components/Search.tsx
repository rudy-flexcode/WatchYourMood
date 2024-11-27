import { useEffect, useState } from "react";
import "./Search.css";
import "./Movies.css";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview:string;
  vote_average:number;
  release_date:string;
};

function Search() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [clicked, setClicked] = useState<{ [key: number]: boolean }>(
    {},
  );


  
  useEffect(() => {
    // Récupérer les films
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=01e787d764d61219a648b30bc425cdc9&language=fr",
    )
    .then((response) => response.json())
    .then((json) => setMovies(json.results));
  },[]);
  
   // Gère le recto verso au clic, en fonction de l'ID du film
  const handleClick = (id: number) => {
    setClicked((clicked) => ({
      [id]: !clicked[id], // Inverse l'état de visibilité pour l'ID du film cliqué
    }));
  };

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
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              onClick={() => handleClick(data.id)}
              className={`recto ${clicked[data.id] ? "hidden" : ""}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title}
              />
            </div>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              onClick={() => handleClick(data.id)}
              className={`verso ${!clicked[data.id] ? "hidden" : ""}`}
            >
              <p>{data.title}</p>
              <p>Date de sortie : {data.release_date}</p>
              <p>Synopsis : {data.overview}</p>
              <p>Note moyenne : {data.vote_average}/10</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Search;
