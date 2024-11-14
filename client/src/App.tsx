import Footer from "./components/Footer";
import "./App.css";
import Avatar from "./components/Avatar";
import Logo from "./components/Logo";
import Nav from "./components/Navbar";

function App() {
  return (
    <>
      <header>
        <Logo />
        <Nav />
      </header>
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
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
