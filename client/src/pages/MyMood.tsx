import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import colereImage from "../assets/images/colere-entier.png";
import joieImage from "../assets/images/joie-entier.png";
import peurImage from "../assets/images/peur-entier.png";
import tristesseImage from "../assets/images/triste-entier.png";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Nav from "../components/Navbar";

import "./MyMood.css";

function MyMood() {
  const { emotionID } = useParams<{ emotionID: string }>();
  const movies = useLoaderData() as {
    //const pour récupérer les datas du loader créé dans main.tsx
    id: number;
    title: string;
    poster_path: string; //on définit les données et le type qu'on récupère
  }[];

  //Mapping entre EmotionID dans l'url et l'image qu'on veut afficher
  const emotionImage: Record<string, string> = {
    joie: joieImage,
    peur: peurImage,
    tristesse: tristesseImage,
    colere: colereImage,
  };

  // vérifie si on a bien un emotionID dans l'URL, si oui on affiche l'image associée sinon image par défaut.
  const currentImage =
    emotionID && emotionImage[emotionID]
      ? emotionImage[emotionID]
      : "../assets/images/default.png";

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
