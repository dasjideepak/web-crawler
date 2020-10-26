import React from "react";
import { AiOutlineStar } from "react-icons/ai";

export default function MovieCard(props) {
  const { movie } = props;
  return (
    <div
      className="bg-white w-full mx-auto flex my-8 px-1 py-4 rounded"
      style={{
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
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
          <p className="text-grey-darker text-base py-1">{movie.description}</p>
          <div className="py-1">
            <div className="flex items-center">
              <span className="pr-4">Votes: 2,298,093</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
