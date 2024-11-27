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
  const [viewed, setViewed] = useState<number[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const [dislikes, setDislikes] = useState<number[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=01e787d764d61219a648b30bc425cdc9",
    )
      .then((response) => response.json())
      .then((json) => setMovies(json.results));

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

  const toggleViewed = (id: number) => {
    const updatedViewed = viewed.includes(id)
      ? viewed.filter((viewedId) => viewedId !== id)
      : [...viewed, id];
    setViewed(updatedViewed);
    localStorage.setItem("viewed", JSON.stringify(updatedViewed));
  };

  const toggleLike = (id: number) => {
    const updatedLikes = likes.includes(id)
      ? likes.filter((likeId) => likeId !== id)
      : [...likes, id];
    setLikes(updatedLikes);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));

    if (dislikes.includes(id)) {
      const updatedDislikes = dislikes.filter((dislikeId) => dislikeId !== id);
      setDislikes(updatedDislikes);
      localStorage.setItem("dislikes", JSON.stringify(updatedDislikes));
    }
  };

  const toggleDislike = (id: number) => {
    const updatedDislikes = dislikes.includes(id)
      ? dislikes.filter((dislikeId) => dislikeId !== id)
      : [...dislikes, id];
    setDislikes(updatedDislikes);
    localStorage.setItem("dislikes", JSON.stringify(updatedDislikes));

    if (likes.includes(id)) {
      const updatedLikes = likes.filter((likeId) => likeId !== id);
      setLikes(updatedLikes);
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
    }
  };

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
                {favorites.some((fav) => fav.id === data.id) ? "★" : "☆"}
              </button>
              <button
                className={`viewed-button ${
                  viewed.includes(data.id) ? "active" : ""
                }`}
                type="button"
                onClick={() => toggleViewed(data.id)}
              >
                ✔︎
              </button>
              <button
                className={`like-button ${
                  likes.includes(data.id) ? "active" : ""
                }`}
                type="button"
                onClick={() => toggleLike(data.id)}
              >
                👍🏼
              </button>
              <button
                className={`dislike-button ${
                  dislikes.includes(data.id) ? "active" : ""
                }`}
                type="button"
                onClick={() => toggleDislike(data.id)}
              >
                👎🏼
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
