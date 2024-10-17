import React from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';

const HomePage = () => {
  return (
    <div className="container">
      <header className="jumbotron text-center my-4">
        <h1 className="display-4">Movie Search App</h1>
        <p className="lead">Find, explore and save your favorite movies!</p>
      </header>

      <div className="row">
        <div className="col-md-12">
          <SearchBar />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <MovieList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
