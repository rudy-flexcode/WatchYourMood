import Logo from "../components/Logo";
import Moovie from "../components/Moovies";
import Nav from "../components/Navbar";

function Watchlist() {
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
