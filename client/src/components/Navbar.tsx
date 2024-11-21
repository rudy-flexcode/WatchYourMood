import "./Header.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <ul>
      <li>Mon Mood</li>
      <Link to="/watchlist">
        <li>Watchlist</li>
      </Link>
    </ul>
  );
}

export default Nav;
