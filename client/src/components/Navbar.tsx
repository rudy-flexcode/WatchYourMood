import "./Header.css";
import { Link } from "react-router-dom";

interface NavType {
  isInMyMood?: boolean;
}
function Nav({ isInMyMood }: NavType) {
  return (
    <ul>
      <Link to="/mood">
        <li className={isInMyMood ? "mon-mood" : ""}>Mon Mood</li>
      </Link>
      <li>Watchlist</li>
    </ul>
  );
}

export default Nav;
