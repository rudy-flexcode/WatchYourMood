import "./Header.css";
import { Link } from "react-router-dom";
import { useStyleContext } from "../context/StyleContext";

interface NavType {
  isInMyMood?: boolean;
  isInWatchlist?: boolean;
}
function Nav({ isInMyMood, isInWatchlist }: NavType) {
  const { backgroundColor } = useStyleContext();
  const textColor = backgroundColor === "#FFDF38" ? "black" : "white";
  return (
    <ul>
      <Link to="/mood">
        <li
          className={isInMyMood ? "mon-mood" : ""}
          style={isInMyMood ? { backgroundColor, color: textColor } : {}}
        >
          Mon Mood
        </li>
      </Link>

      <li
        className={isInWatchlist ? "mon-mood" : ""}
        style={isInWatchlist ? { backgroundColor, color: textColor } : {}}
      >
        <Link to="/watchlist" style={isInWatchlist ? { color: textColor } : {}}>
          Watchlist
        </Link>
      </li>
    </ul>
  );
}

export default Nav;
