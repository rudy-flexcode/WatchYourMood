import Logo from "../components/Logo";
import Nav from "../components/Navbar";
import Moovie from "../components/Moovies";
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
    )
}

export default Base;