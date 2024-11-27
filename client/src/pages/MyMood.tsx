import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import colereImage from "../assets/images/colere-entier.png";
import joieImage from "../assets/images/joie-entier.png";
import peurImage from "../assets/images/peur-entier.png";
import tristesseImage from "../assets/images/triste-entier.png";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import Nav from "../components/Navbar";
import { useStyleContext } from "../context/StyleContext";
import "./MyMood.css";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

function MyMood() {
  const { emotionID } = useParams();
  const { getColors } = useStyleContext();

  getColors(emotionID ?? null);

  const movies = useLoaderData() as Movie[];

  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [viewed, setViewed] = useState<number[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const [dislikes, setDislikes] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
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

  const emotionImage: Record<string, string> = {
    joie: joieImage,
    peur: peurImage,
    tristesse: tristesseImage,
    colere: colereImage,
  };

  const currentImage =
    emotionID && emotionImage[emotionID]
      ? emotionImage[emotionID]
      : "../assets/images/default.png";

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <header>
        <Logo />
        <Nav isInMyMood={true} />
      </header>
      <main>
        <div className="search_result">
          {movies.map((movie) => (
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
                    viewed.includes(movie.id) ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => toggleViewed(movie.id)}
                >
                  ✔︎
                </button>
                <button
                  className={`like-button ${
                    likes.includes(movie.id) ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => toggleLike(movie.id)}
                >
                  👍🏼
                </button>
                <button
                  className={`dislike-button ${
                    dislikes.includes(movie.id) ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => toggleDislike(movie.id)}
                >
                  👎🏼
                </button>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <img
        className="personnage-image"
        src={currentImage}
        alt={emotionID || "default"}
      />
    </>
  );
}

export default MyMood;
