import "./App.css";
import { Link } from "react-router-dom";

import Avatar from "./components/Avatar";
import Footer from "./components/Footer";
import Logo from "./components/Logo";

function App() {
  return (
    <>
      <header>
        <Logo />
      </header>
      <div>
        <h1 className="titre">Quel est ton mood aujourd'hui ?</h1>
        <div>
          <Avatar />
        </div>
        <div className="button">
          <Link to="/mood" className="button-suivant">
            <button className="Suivant" type="button">
              Suivant
            </button>
          </Link>
          <Link to="/Base" className="VoirFilm">
            <button className="btn1" type="button">
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