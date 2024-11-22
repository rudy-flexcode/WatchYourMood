import colereImage from "../assets/images/colere.png";
import joieImage from "../assets/images/joie.png";
import peurImage from "../assets/images/peur.png";
import tristesseImage from "../assets/images/tristesse.png";
import "./Avatar.css";

const Avatar = () => {
  return (
    <div className="blockAcceuil">
      <div className="block" data-name="joie">
        <img src={joieImage} alt="vice versa joie" />
      </div>
      <div className="block" data-name="tristesse">
        <img src={tristesseImage} alt="vice versa triste" />
      </div>
      <div className="block" data-name="peur">
        <img src={peurImage} alt="vice versa peur" />
      </div>
      <div className="block" data-name="colere">
        <img src={colereImage} alt="vice versa colere" />
      </div>
    </div>
  );
};

export default Avatar;
