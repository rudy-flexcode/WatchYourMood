import { useEffect, useState } from "react";
import "./App.css";
import Avatar from "./components/Avatar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Logo from "./components/Logo";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
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
              <button className="Suivant" type="button">
                Suivant
              </button>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
