import colereImage from "../assets/images/colere.png";
import joieImage from "../assets/images/joie.png";
import peurImage from "../assets/images/peur.png";
import tristesseImage from "../assets/images/tristesse.png";
import "./Avatar.css";

const Avatar = ({
  handleEmotionClick,
}: { handleEmotionClick: (emotion: string) => void }) => {
  return (
    <div className="blockAcceuil">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <img
        className="block1"
        src={joieImage}
        alt="vice versa joie"
        onClick={() => handleEmotionClick("joie")}
      />
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <img
        className="block2"
        src={tristesseImage}
        alt="vice versa triste"
        onClick={() => handleEmotionClick("tristesse")}
      />
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <img
        className="block3"
        src={peurImage}
        alt="vice versa peur"
        onClick={() => handleEmotionClick("peur")}
      />
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <img
        className="block4"
        src={colereImage}
        alt="vice versa colère"
        onClick={() => handleEmotionClick("colere")}
      />
    </div>
  );
};

export default Avatar;
