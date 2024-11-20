import { useParams } from "react-router-dom";
import Logo from "../components/Logo";
import Moovie from "../components/Moovies";
import Nav from "../components/Navbar";
import Search from "../components/Search";

function MyMood() {
  const { emotionID } = useParams(); //Récupére l'émotionID de l'URL
  return (
    <>
      <header>
        <Logo />
        <Nav isInMyMood={true} />
      </header>
      <main>
        <Search />
        <p> affiche films pour {emotionID}</p>{" "}
        {/* affiche films pour l'émotion ID de l'url*/}
        <Moovie />
      </main>
    </>
  );
}

export default MyMood;
