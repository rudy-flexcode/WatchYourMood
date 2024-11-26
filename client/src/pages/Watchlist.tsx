import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Nav from "../components/Navbar";

function Watchlist() {
  return (
    <>
      <header>
        <Logo />
        <Nav isInWatchlist={true} />
      </header>

      <main></main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Watchlist;
