import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { ROOT_URL } from "./constants";
import MovieCard from "./MovieCard";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(ROOT_URL + "movies")
      .then((response) => setMovies(response.data.data))
      .catch((error) => error)
      .then(() => setLoading(false));
  }, []);

  function handleSearchInputChanges(e) {
    setSearchValue(e.target.value);
  }

  return (
    <div style={{ maxWidth: "976px", margin: "0 auto" }}>
      <h1 className="py-8 text-center text-3xl text-blue-700 font-bold">
        Search Movies
      </h1>
      <div>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          id="username"
          type="text"
          value={searchValue}
          onChange={handleSearchInputChanges}
          placeholder="Enter movie name or genre"
        />
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center py-8">
          <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />
        </div>
      ) : (
        movies
          ?.filter(
            (movie) =>
              movie.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              movie.genre.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((movie) => {
            return <MovieCard movie={movie} key={uuid()} />;
          })
      )}
    </div>
  );
}

export default HomePage;
