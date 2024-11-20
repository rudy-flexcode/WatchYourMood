import { useParams } from "react-router-dom";
import Logo from "../components/Logo";
import Nav from "../components/Navbar";
import EmotionsMovies from "../components/EmotionsMovies";



function MyMood() {
  const { emotionID } = useParams(); //Récupére l'émotionID de l'URL
  return (
    <>
      <header>
        <Logo />
        <Nav isInMyMood={true} />
      </header>
      <main>
        <EmotionsMovies emotion={emotionID} />
      </main>
    </>
  );
}

export default MyMood;
