import Loading from "react-loading";
import Logo from "./Logo";
import "./Loader.css";
import tristeImage from "../assets/images/triste-entier.png";

function Loader() {
  return (
    <div className="loader">
      <Logo />
      <Loading type="spokes" color="#FFFF00" />
      <p>chargement</p>

      <div className="fusion">
        <img className="imgtriste" src={tristeImage} alt="img" />
      </div>
    </div>
  );
}

export default Loader;
