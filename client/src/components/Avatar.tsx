import type React from "react";
import colereImage from "../assets/images/colere.png";
import joieImage from "../assets/images/joie.png";
import peurImage from "../assets/images/peur.png";
import tristesseImage from "../assets/images/tristesse.png";
import { Link } from "react-router-dom";
import "./Avatar.css";

const Avatar: React.FC = () => {
  return (
    <div className="blockAcceuil">
      <Link to="/mood/joie">
        <img className="block1" src={joieImage} alt="vice versa joie" />
      </Link>
      <Link to="/mood/tristesse">
        <img className="block2" src={tristesseImage} alt="vice versa triste" />
      </Link>
      <Link to="/mood/peur">
        <img className="block3" src={peurImage} alt="vice versa peur" />
      </Link>
      <Link to="/mood/colere">
        <img className="block4" src={colereImage} alt="vice versa colere" />
      </Link>
    </div>
  );
};

export default Avatar;
