import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="flexbox">
      <p>2024 Watch Your Mood</p>
      <p>Par Manon Rudy Marc Nabil</p>
      <div className="click-event box">
        <Link to="/contact">
          <button type="button" id="btn-1">
            Contactez-nous
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
