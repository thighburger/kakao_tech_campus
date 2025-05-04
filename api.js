// api.js
import { API_KEY } from './config.js';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = API_KEY;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

export async function fetchPopularMovies() {
  const url = `${BASE_URL}/movie/popular?language=en-US&page=1`;
  const response = await fetch(url, options);
  const data = await response.json();
  return data.results;
}

export async function fetchMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?language=en-US`;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
