import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
  },
});

export const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;
export const getImageUrl = (path, size = 'w500') => path ? `${IMAGE_BASE}/${size}${path}` : null;

export const fetchTrending = (window = 'week') => api.get(`/trending/all/${window}`).then(r => r.data.results);
export const fetchPopularMovies = (page = 1) => api.get('/movie/popular', { params: { page } }).then(r => r.data.results);
export const fetchPopularTV = (page = 1) => api.get('/tv/popular', { params: { page } }).then(r => r.data.results);
export const fetchTopRatedMovies = (page = 1) => api.get('/movie/top_rated', { params: { page } }).then(r => r.data.results);
export const fetchMovieGenres = () => api.get('/genre/movie/list').then(r => r.data.genres);
export const fetchTVGenres = () => api.get('/genre/tv/list').then(r => r.data.genres);
export const fetchMoviesByGenre = (genreId, page = 1) => api.get('/discover/movie', { params: { with_genres: genreId, page, sort_by: 'popularity.desc' } }).then(r => r.data.results);
export const fetchTVByGenre = (genreId, page = 1) => api.get('/discover/tv', { params: { with_genres: genreId, page, sort_by: 'popularity.desc' } }).then(r => r.data.results);
export const searchMulti = (query, page = 1) => api.get('/search/multi', { params: { query, page, include_adult: false } }).then(r => r.data.results.filter(item => item.media_type !== 'person'));
export const fetchDetails = (mediaType, id) => api.get(`/${mediaType}/${id}`, { params: { append_to_response: 'credits,videos' } }).then(r => r.data); 
