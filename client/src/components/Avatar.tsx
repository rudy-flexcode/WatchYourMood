import type React from "react";
import colereImage from "../../src/assets/images/colere.png";
import joieImage from "../../src/assets/images/joie.png";
import peurImage from "../../src/assets/images/peur.png";
import tristesseImage from "../../src/assets/images/tristesse.png";

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
