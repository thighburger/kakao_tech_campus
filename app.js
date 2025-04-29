const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmMwNjM2Yzk0NzkwZjk1YzljNzZhNjJlNjE2OTA1ZSIsIm5iZiI6MTc0NTg4MzAxNC4xNTEsInN1YiI6IjY4MTAwZjg2YmEyNDFkOGFlYTgxMjUwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gmYw0IeyOWvlhqQU_pH_X-BPbksoSlf6XzbKZYYDdfk';
const BASE_URL = 'https://api.themoviedb.org/3';

// 영화 리스트 가져오기
async function fetchMovies(query = '') {
  let url = '';
  if (query === '') {
    // 검색어 없으면 인기 영화 가져오기
    url = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;
  } else {
    // 검색어 있으면 검색 결과 가져오기
    url = `${BASE_URL}/search/movie?language=en-US&query=${encodeURIComponent(query)}&page=1`;
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const movies = data.results;
    renderMovies(movies);

    // 검색어 없을 때만 날짜 보여주기 (now_playing에서만 dates 있음)
    if (query === '' && data.dates) {
      renderDates(data.dates);
    }
  } catch (error) {
    console.error('영화 데이터 가져오기 실패:', error);
  }
}

// 영화 상세정보 가져오기
async function fetchMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?language=en-US`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('영화 상세 정보 가져오기 실패:', error);
  }
}

// 날짜 표시
function renderDates(date) {
  const today = document.getElementById('date');
  today.innerText = `${date.minimum} ~ ${date.maximum}`;
}

// 영화 카드 렌더링
function renderMovies(movies) {
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
          <p>${movie.overview.substring(0, 100)}...</p>
      </div>
    `;
    movieList.appendChild(card);
  });
}

// 검색 버튼 클릭
document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-input').value.trim();
  fetchMovies(query);
});

// 영화 카드 클릭하면 상세정보 모달 열기
document.getElementById('movie-list').addEventListener('click', async (event) => {
  const card = event.target.closest('.movie-card');
  if (!card) return;
  const movieId = card.dataset.id;

  const movie = await fetchMovieDetails(movieId);

  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');

  modalBody.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" style="width:100%;">
    <p>⭐ 평점: ${movie.vote_average}</p>
    <p>${movie.overview}</p>
  `;

  modal.style.display = 'block';
});

// 모달 닫기
document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

// 시작하자마자 영화 보여주기
fetchMovies();