import type React from "react";
import colereImage from "../assets/images/colere.png";
import joieImage from "../assets/images/joie.png";
import peurImage from "../assets/images/peur.png";
import tristesseImage from "../assets/images/tristesse.png";
import "./Avatar.css"

const Avatar: React.FC = () => {
  return (
    <div className="blockAcceuil">
      <img className="block1" src={joieImage} alt="vice versa joie" />
      <img className="block2" src={tristesseImage} alt="vice versa triste" />
      <img className="block3" src={peurImage} alt="vice versa peur" />
      <img className="block4" src={colereImage} alt="vice versa colere" />
    </div>
  );
};

export default Avatar;
