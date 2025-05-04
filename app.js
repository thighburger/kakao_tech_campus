// app.js
import { fetchPopularMovies, fetchMovieDetails } from './api.js';
import { renderMovies, showMovieModal, closeModal } from './ui.js';

let allMovies = [];

async function init() {
  allMovies = await fetchPopularMovies();
  renderMovies(allMovies);
  setupEventListeners();
}

function setupEventListeners() {
  // 검색 버튼 클릭
  document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    const filtered = allMovies.filter(movie =>
      movie.title.includes(query)
    );
    renderMovies(filtered);
  });

  //엔터눌러서 검색
  document.getElementById('search-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      document.getElementById('search-button').click();
    }
  });

  // 영화 카드 클릭 (모달 열기)
  document.getElementById('movie-list').addEventListener('click', async (event) => {
    const card = event.target.closest('.movie-card');
    if (!card) return;
    const movieId = card.dataset.id;
    const movie = await fetchMovieDetails(movieId);
    showMovieModal(movie);
  });

  // 모달 닫기
  document.getElementById('modal-close').addEventListener('click', closeModal);
}

// 앱 실행
init();
