
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch(
          "https://ghibliapi.vercel.app/films"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, []);

  function handleSearch() {
    const result = movies.filter(movie =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredMovies(result);
  }

  function handleClear() {
    setSearch('');
    setFilteredMovies(movies);
  }

  return (
    <div>
      <h1>Movie Explorer</h1>

      <input
        placeholder="Search Movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>

      {loading && <p>Loading movies...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div>
          <h2>Movies List</h2>

          {filteredMovies.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            filteredMovies.map(movie => (
              <div key={movie.id}>
                <h3>{movie.title}</h3>
                <p><b>Director:</b> {movie.director}</p>
                <p><b>Producer:</b> {movie.producer}</p>
                <p><b>Release Year:</b> {movie.release_date}</p>
                <p><b>Rating:</b> {movie.rt_score}/100</p>
                <p>{movie.description}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
