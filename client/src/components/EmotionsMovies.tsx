/* Ce composant sera dans le composant/page My Mood*/
/* il contient le fetch API avec tous les films et en fonction de l'émotion choisi par l'utilisateur, grâce aux props on change le genre de films qui s'affiche */
/* fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=01e787d764d61219a648b30bc425cdc9&language=fr-FR")
  .then((response) => response.json())
  .then((data) => console.log(data));
  ça c'est pour récupérer les genres des films (ID et NOM)
*/

import React from "react";
import { useParams } from "react-router-dom";

function Mood() {
  // Récupérer l'id de l'image via les paramètres d'URL
  const { emotionId } = useParams();

  // Logique pour varier le contenu en fonction de l'image
  let content;
  switch (emotionId) {
    case "joie":
      content = <p>Contenu associé à l'image 1</p>;
      break;
    case "2":
      content = <p>Contenu associé à l'image 2</p>;
      break;
    case "3":
      content = <p>Contenu associé à l'image 3</p>;
      break;
    case "4":
      content = <p>Contenu associé à l'image 4</p>;
      break;
    default:
      content = <p>Image non reconnue</p>;
  }

  return (
    <div>
      <h1>Composant Mood</h1>
      {content}
    </div>
  );
}

export default Mood;

