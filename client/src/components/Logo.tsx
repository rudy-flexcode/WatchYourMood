import "./Header.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to="/">
      <img
        id="logo"
        src="./images/Logo-WatchYourMood.png"
        alt="Logo WatchyourMood"
      />
      </Link>
    </>
  );
}

export default Logo;
