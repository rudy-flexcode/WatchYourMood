import { useState } from "react";
import colereImage from "../assets/images/colere.png";
import joieImage from "../assets/images/joie.png";
import peurImage from "../assets/images/peur.png";
import tristesseImage from "../assets/images/tristesse.png";
import "./Avatar.css";

const Avatar = ({
  handleEmotionClick,
}: { handleEmotionClick: (emotion: string) => void }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const handleClick = (emotion: string) => {
    setSelectedEmotion(emotion);
    handleEmotionClick(emotion);
  };

  return (
    <div className="blockAcceuil">
      <div className={`block ${selectedEmotion === "joie" ? "highlight" : ""}`} data-name="joie">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <img
          id="joie"
          src={joieImage}
          alt="vice versa joie"
          onClick={() => handleClick("joie")}
        />
      </div>
      <div className={`block ${selectedEmotion === "tristesse" ? "highlight" : ""}`} data-name="tristesse">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <img
          id="tristesse"
          src={tristesseImage}
          alt="vice versa triste"
          onClick={() => handleClick("tristesse")}
        />
      </div>
      <div className={`block ${selectedEmotion === "peur" ? "highlight" : ""}`} data-name="peur">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <img
          id="peur"
          src={peurImage}
          alt="vice versa peur"
          onClick={() => handleClick("peur")}
        />
      </div>
      <div className={`block ${selectedEmotion === "colere" ? "highlight" : ""}`} data-name="colere">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <img
          id="colere"
          src={colereImage}
          alt="vice versa colère"
          onClick={() => handleClick("colere")}
        />
      </div>
    </div>
  );
};

export default Avatar;
