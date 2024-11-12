import "./App.css";
import Avatar from "./components/Avatar";

import type React from "react";

const App: React.FC = () => {
  return (
    <>
      <div>
        <h1 className="titre">Quel est ton mood aujourd'hui ?</h1>
        <div>
          <Avatar />
        </div>
        <div className="button">
          <button className="Suivant" type="button">
            Suivant
          </button>
          <button className="VoirFilm" type="button">
            Voir tous les films
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
