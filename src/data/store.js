import {reactive} from 'vue';

export const store = reactive({

  // Chiavi API
  apiUrl: "https://api.themoviedb.org/3/search/movie?api_key=f2191c31fa927ebbbfd133d861d35f14&language=it-IT",
  apiUrlTV: "https://api.themoviedb.org/3/search/tv?api_key=f2191c31fa927ebbbfd133d861d35f14&language=it-IT",
  apiUrlLoad: "https://api.themoviedb.org/3/search/movie?api_key=f2191c31fa927ebbbfd133d861d35f14&language=it-IT&query=harry-potter",
  apiUrlCast: "https://developers.themoviedb.org/3/movies/get-movie-details",

  searchInput: '',
  loading: false,

  moviesArray: [],
  seriesArray: [],
  loadArray: [],
  cast: [],

})