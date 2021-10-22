import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl,isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condition/variable

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    // if [], run once when the row load ,and dont run again
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    }else {
      movieTrailer(movie?.name || "")
      .then(url => {

        const urlParams = new URLSearchParams( URL(url).search);
       setTrailerUrl(urlParams.get('v'));

      })
      .catch(error => console.log(error));
    }

  };

  // console.table(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">

      {movies.map((movie) => (
        <img
          key={movie.id}
          onClick={() =>handleClick(movie)}
          className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          src={`${base_url}${isLargeRow? movie.poster_path: movie.backdrop_path}`}
          alt={movie.name}
        />
      ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
    </div>
  );
};

export default Row;
 