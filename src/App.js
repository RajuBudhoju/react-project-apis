import React,{ useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingMovie, setIsAddingMovie] = useState(false); // New state for showing/hiding the form
  const [newMovie, setNewMovie] = useState({
    title: '',
    openingText: '',
    releaseDate: ''
  });

  async function fetchMoviesHandler() {
    try {
      setIsLoading(true);
      const response = await fetch('https://swapi.dev/api/films')
      const data = await response.json();
    
      const transformedMovies = data.results.map(movieData => {
          return {
            id:movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          };
        });
        setMovies(transformedMovies);
    } finally {
      setIsLoading(false);
    }
   
  }

  const addMovieHandler = () => {
    setMovies((preMovies) => [
      ...preMovies, 
      {
         id: Math.random().toString(), ...newMovie
      }
    ]);
    setIsAddingMovie(false);
    setNewMovie({
      title: '',
      openingText: '',
      releaseDate: ''
    });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={() => setIsAddingMovie(true)}>Add Movie</button>
      </section>
      <section>
        {isAddingMovie && (
            <form>
              <label>Title:</label>
              <input
                type="text"
                value={newMovie.title}
                onChange={(e) => setNewMovie((prev) => ({ ...prev, title: e.target.value }))}
              />
              <label>Opening Text:</label>
              <textarea
                rows="4"
                value={newMovie.openingText}
                onChange={(e) => setNewMovie((prev) => ({ ...prev, openingText: e.target.value }))}
              />
              <label>Release Date:</label>
              <input
                type="text"
                value={newMovie.releaseDate}
                onChange={(e) => setNewMovie((prev) => ({ ...prev, releaseDate: e.target.value }))}
              />
              <button type="button" onClick={addMovieHandler}>
                Add Movie
              </button>
            </form>
        )}
        {isLoading && <p>Loading...</p>}
        <MoviesList movies={movies} />
      </section>

    </React.Fragment>
  );
}

export default App;