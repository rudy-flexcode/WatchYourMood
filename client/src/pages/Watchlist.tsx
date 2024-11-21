import FavoritesPage from "../components/FavoritesPage";
import Logo from "../components/Logo";
import Nav from "../components/Navbar";

function Watchlist() {
  return (
    <>
      <header>
        <Logo />
        <Nav />
      </header>

      <main>
        <FavoritesPage />
      </main>
    </>
  );
}

export default Watchlist;
