import { Link } from "react-router-dom";
import { useStyleContext } from "../context/StyleContext";

import "./Footer.css";

function Footer() {
  const { backgroundColor } = useStyleContext();
  // Utilisation du contexte pour récupérer la couleur de fond
  return (
    <div className="flexbox" style={{ backgroundColor }}>
      <p>2024 Watch Your Mood</p>
      <p>Par Manon Moutier, Rudy Robert, Marc Juvénal & Nabil Afenich</p>
      <div className="click-event box">
        <Link to="/contact">
          <button
            type="button"
            id="btn-1"
            style={{ backgroundColor }}
          >
            Contactez-nous
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
