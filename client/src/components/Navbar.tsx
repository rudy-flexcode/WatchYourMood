import "./Header.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <ul>
      <Link to="/mood" className="mon-mood">
      <li>Mon Mood</li>
      </Link>
      <li>Watchlist</li>
    </ul>
  );
}

export default Nav;
