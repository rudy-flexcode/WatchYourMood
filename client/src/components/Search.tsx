import { useEffect, useState } from "react";
import "./Search.css";
import "./Movies.css";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
};

function Search() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [viewed, setViewed] = useState<Movie[]>([]);
  const [likes, setLikes] = useState<Movie[]>([]);
  const [dislikes, setDislikes] = useState<Movie[]>([]);
  const [clicked, setClicked] = useState<{ [key: number]: boolean }>({});

  // Charger les films et les états depuis localStorage
  useEffect(() => {
    // Charger les films depuis l'API TMDB
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=01e787d764d61219a648b30bc425cdc9&language=fr",
    )
      .then((response) => response.json())
      .then((json) => setMovies(json.results));

    // Charger les états initiaux depuis localStorage
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    const savedViewed = JSON.parse(localStorage.getItem("viewed") || "[]");
    const savedLikes = JSON.parse(localStorage.getItem("likes") || "[]");
    const savedDislikes = JSON.parse(localStorage.getItem("dislikes") || "[]");

    setFavorites(savedFavorites);
    setViewed(savedViewed);
    setLikes(savedLikes);
    setDislikes(savedDislikes);
  }, []);

  // Gérer les recherches
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Gérer le clic sur le recto/verso d'une carte
  const handleClick = (id: number) => {
    setClicked((clicked) => ({
      ...clicked,
      [id]: !clicked[id], // Inverse l'état de visibilité pour l'ID du film cliqué
    }));
  };

  // Ajouter ou supprimer des favoris
  const toggleFavorite = (movie: Movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Marquer comme vu/non vu
  const toggleViewed = (movie: Movie) => {
    const isViewed = viewed.some((view) => view.id === movie.id);
    const updatedViewed = isViewed
      ? viewed.filter((view) => view.id !== movie.id)
      : [...viewed, movie];
    setViewed(updatedViewed);
    localStorage.setItem("viewed", JSON.stringify(updatedViewed));
  };

  // Gérer les likes
  const toggleLike = (movie: Movie) => {
    const isLike = likes.some((like) => like.id === movie.id);
    const updatedLikes = isLike
      ? likes.filter((like) => like.id !== movie.id)
      : [...likes, movie];
    setLikes(updatedLikes);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
  };

  // Gérer les dislikes
  const toggleDislike = (movie: Movie) => {
    const isDislike = dislikes.some((dislike) => dislike.id === movie.id);
    const updatedDislikes = isDislike
      ? dislikes.filter((dislike) => dislike.id !== movie.id)
      : [...dislikes, movie];
    setDislikes(updatedDislikes);
    localStorage.setItem("dislikes", JSON.stringify(updatedDislikes));
  };

  // Filtrer les films selon la recherche
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
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
        {filteredMovies.map((movie) => (
          <div className="search_results" key={movie.id}>
            {/* Boutons */}
            <div className="button-container">
              <button
                className={`favorite-button ${
                  favorites.some((fav) => fav.id === movie.id) ? "active" : ""
                }`}
                type="button"
                onClick={() => toggleFavorite(movie)}
              >
                {favorites.some((fav) => fav.id === movie.id) ? "★" : "☆"}
              </button>
              <button
                className={`viewed-button ${
                  viewed.some((view) => view.id === movie.id) ? "active" : ""
                }`}
                type="button"
                onClick={() => toggleViewed(movie)}
              >
                ✔︎
              </button>
              <button
                className={`like-button ${
                  likes.some((like) => like.id === movie.id) ? "active" : ""
                }`}
                type="button"
                onClick={() => toggleLike(movie)}
              >
                👍🏼
              </button>
              <button
                className={`dislike-button ${
                  dislikes.some((dislike) => dislike.id === movie.id)
                    ? "active"
                    : ""
                }`}
                type="button"
                onClick={() => toggleDislike(movie)}
              >
                👎🏼
              </button>
            </div>

            {/* Recto et verso */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              onClick={() => handleClick(movie.id)}
              className={`recto ${clicked[movie.id] ? "hidden" : ""}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              onClick={() => handleClick(movie.id)}
              className={`verso ${!clicked[movie.id] ? "hidden" : ""}`}
            >
              <p>{movie.title}</p>
              <p>Date de sortie : {movie.release_date}</p>
              <p>Synopsis : {movie.overview}</p>
              <p>Note moyenne : {movie.vote_average}/10</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Search;
