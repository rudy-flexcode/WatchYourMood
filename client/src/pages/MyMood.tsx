import { useLoaderData } from "react-router-dom";
import Logo from "../components/Logo";
import Nav from "../components/Navbar";

function MyMood() {
  const movies = useLoaderData() as {
    id: number;
    title: string;
    poster_path: string;
  }[];

  return (
    <>
      <header>
        <Logo />
        <Nav isInMyMood={true} />
      </header>
      <main>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </main>
    </>
  );
}

export default MyMood;
