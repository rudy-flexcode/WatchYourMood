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
  const navigate = useNavigate();
  const [clicked, setClicked] = useState<{ [key: number]: boolean }>({});
 useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=01e787d764d61219a648b30bc425cdc9&language=fr",
    )
      .then((response) => response.json())
      .then((json) => setMovies(json.results));

  // Gère le recto verso au clic, en fonction de l'ID du film
  const handleClick = (id: number) => {
    setClicked((clicked) => ({
      [id]: !clicked[id], // Inverse l'état de visibilité pour l'ID du film cliqué
    }));
  };
 // Load initial states from localStorage
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
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    };

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

  const toggleViewed = (movie: Movie) => {
    const isViewed = viewed.some((view) => view.id === movie.id);

    if (isViewed) {
      const updatedViewed = viewed.filter((view) => view.id !== movie.id);
      setViewed(updatedViewed);
      localStorage.setItem("viewed", JSON.stringify(updatedViewed));
    } else {
      const updatedViewed = [...viewed, movie];
      setViewed(updatedViewed);
      localStorage.setItem("viewed", JSON.stringify(updatedViewed));
    }
  };

  const toggleLike = (movie: Movie) => {
    const isLike = likes.some((like) => like.id === movie.id);

    if (isLike) {
      const updatedLikes = likes.filter((like) => like.id !== movie.id);
      setLikes(updatedLikes);
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
    } else {
      const updatedLikes = [...likes, movie];
      setLikes(updatedLikes);
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
    }
  };

  const toggleDislike = (movie: Movie) => {
    const isDislike = dislikes.some((dislike) => dislike.id === movie.id);

    if (isDislike) {
      const updatedDislikes = dislikes.filter(
        (dislike) => dislike.id !== movie.id,
      );
      setDislikes(updatedDislikes);
      localStorage.setItem("dislikes", JSON.stringify(updatedDislikes));
    } else {
      const updatedDislikes = [...dislikes, movie];
      setDislikes(updatedDislikes);
      localStorage.setItem("dislikes", JSON.stringify(updatedDislikes));
    }
  };

  const filteredMovie = movies.filter((movie) =>
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
        {filteredMovie.map((movie) => (
          <div className="search_results" key={movie.id}>
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
            </div>
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
     </>
  );
}
export default Search;
