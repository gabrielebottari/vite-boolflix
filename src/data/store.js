import {reactive} from 'vue';

export const store = reactive({

  // Chiavi API
  apiUrl: "https://api.themoviedb.org/3/search/movie?api_key=f2191c31fa927ebbbfd133d861d35f14&language=it-IT",

  searchInput: '',

  movieArray: [],

})