import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { ROOT_URL } from "./constants";
import { AiOutlineStar } from "react-icons/ai";

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
            return (
              <div
                key={uuid()}
                className="bg-white w-full mx-auto flex my-8 px-1 py-4 rounded"
                style={{
                  boxShadow:
                    "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
                }}
              >
                <div className="w-32 px-4 pt-2">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full mx-auto rounded"
                  />
                </div>
                <div className="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                  <div>
                    <div className="text-black font-bold text-xl">
                      {movie.title} {movie.year}
                    </div>
                    <div className="flex py-1">
                      <span className="">{movie.certificate}</span>
                      <span className="px-2">|</span>
                      <span className="">{movie.runtime}</span>
                      <span className="px-2">|</span>
                      <span className="">{movie.genre}</span>
                      <span className="px-2">|</span>
                      <div className="flex items-center">
                        <AiOutlineStar />
                        <span className="px-1">{movie.rating}</span>
                      </div>
                    </div>
                    <p className="text-grey-darker text-base py-1">
                      {movie.description}
                    </p>
                    <div className="py-1">
                      <div className="flex items-center">
                        <span className="pr-4">Votes: 2,298,093</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
      )}
    </div>
  );
}

export default HomePage;
