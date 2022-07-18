import React, { useEffect, useState } from "react";
import instance from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      console.log(request.data.results);
      return request;
    }
    fetchData();
  }, [movies, fetchUrl]);
  console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      //
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if(trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.name || '').then(url => {
const urlParams = new URLSearchParams(new URL(url).search)
setTrailerUrl( urlParams.get('v'))
      }).catch(error => console.log(error))
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              onClick={handleClick}
            />
          );
        })}
      </div>
      {trailerUrl && <Youtube videoId opts={opts} />}
    </div>
    // TODO install movie-trailer, install firebase
  );
}

export default Row;
