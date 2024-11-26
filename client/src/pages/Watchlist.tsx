import { useEffect, useState } from "react";
import Loader from "../components/Loader"; // Import du Loader
import Logo from "../components/Logo";
import Moovie from "../components/Moovies";
import Nav from "../components/Navbar";

function Watchlist() {
  const [isLoading, setIsLoading] = useState(true); // État de chargement

  useEffect(() => {
    // Simule un délai de chargement (par ex. 2 secondes)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Nettoyage du timer lors du démontage du composant
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />; // Affiche le Loader tant que isLoading est true
  }

  return (
    <>
      <header>
        <Logo />
        <Nav />
      </header>
      <main>
        <Moovie />
      </main>
    </>
  );
}

export default Watchlist;
