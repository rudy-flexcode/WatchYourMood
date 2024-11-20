import Logo from "../components/Logo";
import Moovie from "../components/Moovies";
import Nav from "../components/Navbar";
import Search from "../components/Search";

function MyMood() {
  return (
    <>
      <header>
        <Logo />
        <Nav isInMyMood={true}/>
      </header>
      <main>
        <Search />
        <Moovie />
      </main>
    </>
  );
}

export default MyMood;
