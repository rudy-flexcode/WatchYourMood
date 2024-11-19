import type React from "react";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    setFavorites(savedFavorites);
  }, []);

  return (
    <div>
      <h1>Mes Favoris</h1>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div key={movie.id} className="favorite-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))
        ) : (
          <p>Aucun film ajouté en favoris.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
