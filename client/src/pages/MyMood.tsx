import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import colereImage from "../assets/images/colere-entier.png";
import joieImage from "../assets/images/joie-entier.png";
import peurImage from "../assets/images/peur-entier.png";
import tristesseImage from "../assets/images/triste-entier.png";
import Footer from "../components/Footer";
import Loader from "../components/Loader"; // Import du Loader
import Logo from "../components/Logo";
import Nav from "../components/Navbar";
import { useStyleContext } from "../context/StyleContext";
import "./MyMood.css";

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

  const [isLoading, setIsLoading] = useState(true); // État de chargement

  useEffect(() => {
    // Simule un délai pour afficher le Loader (ou le temps de chargement des données)
    const timer = setTimeout(() => {
      setIsLoading(false); // Stoppe le chargement
    }, 1000); // 1 seconde de chargement

    // Nettoyage du timer si le composant est démonté
    return () => clearTimeout(timer);
  }, []);

  // Gère le recto verso au clic, en fonction de l'ID du film
  const handleClick = (id: number) => {
    setClicked((clicked) => ({
      [id]: !clicked[id], // Inverse l'état de visibilité pour l'ID du film cliqué
    }));
  };

  // Mapping entre EmotionID dans l'URL et l'image à afficher
  const emotionImage: Record<string, string> = {
    joie: joieImage,
    peur: peurImage,
    tristesse: tristesseImage,
    colere: colereImage,
  };

  // Sélection de l'image courante
  const currentImage =
    emotionID && emotionImage[emotionID]
      ? emotionImage[emotionID]
      : "../assets/images/default.png";

  // Affichage du Loader pendant le chargement
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
            <div className="search_results_mood" key={movie.id}>
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
