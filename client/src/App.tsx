import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./components/Avatar";
import Footer from "./components/Footer";
import Logo from "./components/Logo";

function App() {
  const [suivantButton, setSuivantButton] = useState(false); //Etat du boutton, par défaut : ne se montre pas.
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null); // Etat pour l'émotion sélectionnée

  const handleEmotionClick = (emotion: string) => {
    setSelectedEmotion(emotion);
    setSuivantButton(true);
  }; // fonction permettant qu'au click d'une des émotions, le boutton suivant change d'état et apparait.

  return (
    <>
      <header>
        <Logo />
      </header>
      <div>
        <h1 className="titre">Quel est ton mood aujourd'hui ?</h1>
        <div>
          <Avatar handleEmotionClick={handleEmotionClick} />
        </div>
        <div className="buttons">
          {suivantButton && selectedEmotion && (
            <Link to={`/mood/${selectedEmotion}`} className="button-suivant">
              <button className="text-suivant" type="button">
                Suivant
              </button>
            </Link>
          )}
          <Link to="/Base" className="button-all">
            <button className="text-all" type="button">
              Voir tous les films
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
