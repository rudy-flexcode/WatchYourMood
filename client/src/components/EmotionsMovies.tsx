import { useEffect } from "react";
import { useState } from "react";

function EmotionsMovies({emotion}: {emotion : string}) {
  const [movies, setMovies] = useState([]); //Stocke liste des films
  const [genres, setGenres] = useState([]); // Stocke la liste des genres

  useEffect(() => {
    // Récupérer les films
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=01e787d764d61219a648b30bc425cdc9&language=fr-FR",
    )
      .then((response) => response.json())
      .then((json) => setMovies(json.results));

    // Récupérer les genres
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=01e787d764d61219a648b30bc425cdc9&language=fr-FR",
    )
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      });
  }, []);
}

export default EmotionsMovies;
