// ui.js

export function renderMovies(movies) {
  const movieList = document.getElementById('movie-list');
  movieList.innerHTML = '';

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('data-id', movie.id);
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="info">
          <h3>${movie.title}</h3>
          <p>⭐ ${movie.vote_average}</p>
          <p>${movie.overview ? movie.overview.substring(0, 100) + '...' : ''}</p>
      </div>
    `;
    movieList.appendChild(card);
  });
}

export function showMovieModal(movie) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');

  modalBody.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" style="width:100%;">
    <p>⭐ 평점: ${movie.vote_average}</p>
    <p>${movie.overview}</p>
  `;

  modal.style.display = 'block';
}

export function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
