import Loading from "react-loading";
import Logo from "./Logo";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader">
      <Logo />
      <p>chargement</p>
      <div className="reload">
        <Loading type="spokes" color="#FFFF00" />
      </div>
    </div>
  );
}

export default Loader;
