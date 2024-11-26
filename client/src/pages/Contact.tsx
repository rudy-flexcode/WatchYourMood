import { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import Loader from "../components/Loader";

const Contact: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); // État de chargement

  useEffect(() => {
    // Simule un délai avant d'afficher le contenu
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 secondes de chargement

    // Nettoyage du timer
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />; // Affiche le Loader tant que isLoading est vrai
  }

  return (
    <div>
      <h1>Contactez-nous</h1>
      <ContactForm />
    </div>
  );
};

export default Contact;
