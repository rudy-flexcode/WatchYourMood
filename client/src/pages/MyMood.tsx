import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useStyleContext } from "../context/StyleContext";

import colereImage from "../assets/images/colere-entier.png";
import joieImage from "../assets/images/joie-entier.png";
import peurImage from "../assets/images/peur-entier.png";
import tristeImage from "../assets/images/triste-entier.png";

import Footer from "../components/Footer";
import Loader from "../components/Loader"; // Import du Loader
import Logo from "../components/Logo";
import Nav from "../components/Navbar";

import "./MyMood.css";

function MyMood() {
  const { emotionID } = useParams();
  const { getColors } = useStyleContext();

  getColors(emotionID ?? null);

  const movies = useLoaderData() as {
    id: number;
    title: string;
    poster_path: string;
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

  // Mapping entre EmotionID dans l'URL et l'image à afficher
  const emotionImage: Record<string, string> = {
    joie: joieImage,
    peur: peurImage,
    tristesse: tristeImage,
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
        <div className="search_result">
          <img
            className="personnage-image"
            src={currentImage}
            alt={emotionID || "default"}
          />
          {movies.map((movie) => (
            <div className="search_results" key={movie.id}>
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
    </>
  );
}

export default MyMood;
