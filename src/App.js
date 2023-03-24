import { useEffect, useState } from "react";
import './App.css';
import React from "react";
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

// b10a031c
//http://www.omdbapi.com/?i=tt3896198&apikey=b10a031c

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=b10a031c';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('ABCD');
  }, [])

  return (
    <div className="app">
      <h1>Movie Search Machine</h1>

      <div className="search">
        <input placeholder="Search for Movies"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }} />
        <img src={SearchIcon}
        alt="search"
        onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
        ? (
        <div className="container"> 
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
        )
        : (
          <div className="empty">
          <h2>No movies found</h2>
          </div>
        )
      }
      
    </div>
  );
}

export default App;
