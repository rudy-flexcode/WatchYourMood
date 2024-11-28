import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import Moovie from "../components/Moovies";
import Nav from "../components/Navbar";
import Search from "../components/Search";

function Base() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
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
