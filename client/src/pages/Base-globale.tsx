import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import Moovie from "../components/Moovies";
import Nav from "../components/Navbar";
import Search from "../components/Search";

function Base() {
  const [isLoading, setIsLoading] = useState(true); // État de chargement

  useEffect(() => {
    // Simule un délai de chargement (2 secondes par exemple)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Nettoyage du timer
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />; // Affiche le Loader tant que isLoading est vrai
  }

  return (
    <>
      <header>
        <Logo />
        <Nav />
      </header>
      <main>
        <Search />
        <Moovie />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Base;
