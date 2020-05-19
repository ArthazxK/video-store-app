import React, { useState, useEffect } from "react";
import MoviesContext from "./context/MoviesContext";
import "./App.css";

import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";

import Movies from "./components/Movies";
import ListGroup from "./components/ListGroup";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({
    path: "title",
    order: "asc",
  });
  const pageSize = 4;

  useEffect(() => {
    setMovies(getMovies());
    setGenres(getGenres());
  }, []);

  const onDelete = (movie) => {
    setMovies(movies.filter((m) => m._id !== movie._id));
  };

  const onLiked = (movie) => {
    setMovies(
      movies.map((m) =>
        m._id === movie._id ? { ...movie, liked: !movie.liked } : m
      )
    );
  };

  const onSelectedGenre = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (path) => {
    path === sortColumn.path
      ? setSortColumn({
          path,
          order: sortColumn.order === "asc" ? "desc" : "asc",
        })
      : setSortColumn({ path: path, order: "asc" });
  };

  return (
    <MoviesContext.Provider
      value={{
        movies: movies,
        onDelete,
        onLiked,
        handlePageChange,
        currentPage,
        pageSize,
        selectedGenre,
        onSelectedGenre,
        handleSort,
      }}
    >
      <div className="container" style={{ marginTop: 20 }}>
        <div className="row">
          <div className="col-2">
            <ListGroup onSelectedGenre={onSelectedGenre} genres={genres} />
          </div>
          <div className="col">
            <Movies
              movies={movies}
              currentPage={currentPage}
              pageSize={pageSize}
              selectedGenre={selectedGenre}
              sortColumn={sortColumn}
            />
          </div>
        </div>
      </div>
    </MoviesContext.Provider>
  );
}

export default App;
