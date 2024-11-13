import "./App.css";
import Logo from "./components/Logo";
import Moovie from "./components/Moovies";
import Nav from "./components/Navbar";
import Search from "./components/Search";

function App() {
  return (
    <>
      <header>
        <Logo />
        <Nav />
      </header>

      <div>
        <Search />
        <Moovie />
      </div>
    </>
  );
}

export default App;
