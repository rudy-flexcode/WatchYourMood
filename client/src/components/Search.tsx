import { useEffect, useState } from "react";
import "./Search.css";
import "./Movies.css";

function Search() {
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=768962ec35ca457ffbe6714ba8be24e8",
    )
      .then((response) => response.json())
      .then((json) => setDatas(json.results));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredDatas = datas.filter((data: { title: string }) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="Recherchez selon votre vibe"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="search_result">
        {filteredDatas.map(
          (data: { id: number; title: string; poster_path: string }) => {
            return (
              <div className="search_results" key={data.id}>
                <div className="button-container">
                  <button className="favorite-button" type="button">
                    ★
                  </button>
                  <button className="add-button" type="button">
                    ✔︎
                  </button>
                  <button className="like-button" type="button">
                    👍🏼
                  </button>
                  <button className="dislike-button" type="button">
                    👎🏼
                  </button>
                </div>

                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.title}
                />
              </div>
            );
          },
        )}
      </div>
    </>
  );
}

export default Search;
