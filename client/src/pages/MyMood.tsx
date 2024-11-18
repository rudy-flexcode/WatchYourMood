import Logo from "../components/Logo";
import Moovie from "../components/Moovies";
import Nav from "../components/Navbar";

function MyMood() {
  return (
    <>
      <header>
        <Logo />
        <Nav isInMyMood={true}/>
      </header>
      <main>
        <Moovie />
      </main>
    </>
  );
}

export default MyMood;
