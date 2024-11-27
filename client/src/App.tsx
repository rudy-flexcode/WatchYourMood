import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./components/Avatar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Logo from "./components/Logo";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true); // L'état de chargement
  const [suivantButton, setSuivantButton] = useState(false); // Contrôle de l'apparition du bouton
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null); // L'émotion sélectionnée

  // Fonction pour gérer le clic sur les émotions
  const handleEmotionClick = (emotion: string) => {
    setSelectedEmotion(emotion); // Met à jour l'émotion sélectionnée
    setSuivantButton(true); // Affiche le bouton "Suivant"
  };

  // Utilisation de useEffect pour gérer le délai de chargement
  useEffect(() => {
    // Simule un délai de 5 secondes avant de masquer le loader
    const timer = setTimeout(() => {
      setIsLoading(false); // Après 5 secondes, charger la page
    }, 2000);

    // Nettoyage du timer lors du démontage du composant
    return () => clearTimeout(timer);
  }, []);

  // Si le loader est encore affiché, on ne montre pas la page principale
  if (isLoading) {
    return <Loader />;
  }

  // Si le chargement est terminé, affiche le contenu principal
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
