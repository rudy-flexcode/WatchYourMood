import Logo from "../components/Logo";
import Moovie from "../components/Moovies";
import Nav from "../components/Navbar";
import Search from "../components/Search";

function Base() {
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
    </>
  );
}

export default Base;
