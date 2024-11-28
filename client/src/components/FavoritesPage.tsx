import { useEffect, useState } from "react";
import "./FavoritesPage.css";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [viewed, setViewed] = useState<Movie[]>([]);
  const [likes, setLikes] = useState<Movie[]>([]);
  const [dislikes, setDislikes] = useState<Movie[]>([]);
  const [currentSection, setCurrentSection] = useState<string>("favorites");

  useEffect(() => {
    try {
      const savedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]",
      );
      const savedViewed = JSON.parse(localStorage.getItem("viewed") || "[]");
      const savedLikes = JSON.parse(localStorage.getItem("likes") || "[]");
      const savedDislikes = JSON.parse(
        localStorage.getItem("dislikes") || "[]",
      );
      setFavorites(savedFavorites);
      setViewed(savedViewed);
      setLikes(savedLikes);
      setDislikes(savedDislikes);
    } catch (e) {
      console.error("Failed to parse data from localStorage", e);
      setFavorites([]);
      setViewed([]);
      setLikes([]);
      setDislikes([]);
    }
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case "favorites":
        return (
          <div className="favorites-list">
            {favorites.length > 0 ? (
              favorites.map((movie) => (
                <div key={movie.id} className="favorite-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Affiche du film ${movie.title}`}
                  />
                  <p className="favorite-title">{movie.title}</p>
                </div>
              ))
            ) : (
              <p>Aucun film ajouté en favoris.</p>
            )}
          </div>
        );
      case "viewed":
        return (
          <div className="viewed-list">
            {viewed.length > 0 ? (
              viewed.map((movie) => (
                <div key={movie.id} className="viewed-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Affiche du film ${movie.title}`}
                  />
                  <p className="viewed-title">{movie.title}</p>
                </div>
              ))
            ) : (
              <p>Aucun film marqué comme vu.</p>
            )}
          </div>
        );
      case "likes":
        return (
          <div className="likes-list">
            {likes.length > 0 ? (
              likes.map((movie) => (
                <div key={movie.id} className="like-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Affiche du film ${movie.title}`}
                  />
                  <p className="like-title">{movie.title}</p>
                </div>
              ))
            ) : (
              <p>Aucun film liké.</p>
            )}
          </div>
        );
      case "dislikes":
        return (
          <div className="dislikes-list">
            {dislikes.length > 0 ? (
              dislikes.map((movie) => (
                <div key={movie.id} className="dislike-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Affiche du film ${movie.title}`}
                  />
                  <p className="dislike-title">{movie.title}</p>
                </div>
              ))
            ) : (
              <p>Aucun film non aimé.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <h1>Watchlist</h1>
      <div className="page-content">
        <nav className="favorites-nav">
          <button type="button" onClick={() => setCurrentSection("favorites")}>
            Favoris
          </button>
          <button type="button" onClick={() => setCurrentSection("viewed")}>
            Vus
          </button>
          <button type="button" onClick={() => setCurrentSection("likes")}>
            J'aime
          </button>
          <button type="button" onClick={() => setCurrentSection("dislikes")}>
            Je n'aime pas
          </button>
        </nav>
        <div className="content">{renderSection()}</div>
      </div>
    </div>
  );
}

export default FavoritesPage;
