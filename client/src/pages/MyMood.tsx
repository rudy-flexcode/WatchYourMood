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

// Mapping entre EmotionID dans l'URL et l'image à afficher
const emotionImage: Record<string, string> = {
  joie: joieImage,
  peur: peurImage,
  tristesse: tristesseImage,
  colere: colereImage,
};
function MyMood() {
  const { emotionID } = useParams();
  const { getColors } = useStyleContext();
  const [clicked, setClicked] = useState<{ [key: number]: boolean }>({});

  getColors(emotionID ?? null);

  const movies = useLoaderData() as {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
  }[];

  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [viewed, setViewed] = useState<Movie[]>([]);
  const [likes, setLikes] = useState<Movie[]>([]);
  const [dislikes, setDislikes] = useState<Movie[]>([]);

  console.info({ viewed, likes, dislikes });

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

  const handleClick = (id: number) => {
    setClicked((clicked) => ({
      ...clicked,
      [id]: !clicked[id],
    }));
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
        <div className="search_result_mood">
          {movies.map((movie) => (
            <div className="search_results" key={movie.id}>
              {/* Boutons d'interactions */}
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

              {/* Cartes recto/verso */}
              <div className="search_results_mood" key={movie.id}>
                {/* Recto */}
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

                {/* Verso */}
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
