import { useState } from "react";
import "./ContactForm.css";
import Footer from "./Footer";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [objet, setObjet] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailSent(true);

    setName("");
    setEmail("");
    setObjet("");
    setMessage("");

    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="objet">Objet:</label>
          <input
            type="text"
            id="objet"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>

      {emailSent && (
        <p className="email-sent-message">Votre message a bien été envoyé !</p>
      )}

      <Footer />
    </div>
  );
};

export default ContactForm;
