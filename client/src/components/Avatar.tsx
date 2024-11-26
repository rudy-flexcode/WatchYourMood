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
      <div className="block" data-name="joie">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <img
          id='joie'
          src={joieImage}
          alt="vice versa joie"
          onClick={() => handleEmotionClick("joie")}
        />
      </div>
      <div className="block" data-name="tristesse">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <img
          id='tristesse'
          src={tristesseImage}
          alt="vice versa triste"
          onClick={() => handleEmotionClick("tristesse")}
        />
      </div>
      <div className="block" data-name="peur">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <img
          id='peur'
          src={peurImage}
          alt="vice versa peur"
          onClick={() => handleEmotionClick("peur")}
        />
      </div>
      <div className="block" data-name="colere">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <img
          id='colere'
          src={colereImage}
          alt="vice versa colère"
          onClick={() => handleEmotionClick("colere")}
        />
      </div>
    </div>
  );
};

export default Avatar;
