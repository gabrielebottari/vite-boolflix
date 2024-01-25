<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import {store} from './data/store';
import axios from 'axios'
//import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppMain
  },
  data() {
    return {
      store,
      hasPerformedSearch: false,
      movie: null,
      selectedMovieGenre: null, // Inizializza con un valore di default
      selectedTvGenre: null,    // Inizializza con un valore di default

    };
  },
  methods: {
    getApi() {
    const trimmedSearchInput = (store.searchInput || "").trim();

    // Imposta lo stato di loading su true
    store.loading = true;

    try {
        if (trimmedSearchInput !== "") {
            axios
                .get(store.apiUrl, {
                    params: {
                        query: trimmedSearchInput,
                    },
                })
                .then((result) => {
                    store.moviesArray = result.data.results;
                    console.log("movies", store.moviesArray);
                    this.hasPerformedSearch = true; // Imposta a true dopo la ricerca
                })
                .catch((error) => {
                    console.error("Errore nella chiamata API:", error);
                })
                .finally(() => {
                    // Imposta lo stato di loading su false alla fine
                    store.loading = false;
                });
        } else {
            console.log(
                "La stringa di ricerca è vuota dopo il trim, evito la chiamata API."
            );
            // Imposta lo stato di loading su false
            store.loading = false;
        }
    } catch (error) {
        console.error("Errore durante l'esecuzione di getApi:", error);
        // Gestisci l'errore in modo appropriato
    }
},

    getApiTV() {
    const trimmedSearchInput = (store.searchInput || "").trim();

    // Imposta lo stato di loading su true
    store.loading = true;

    if (trimmedSearchInput !== "") {
        axios
        .get(store.apiUrlTV, {
            params: {
            query: trimmedSearchInput,
            },
        })
        .then((result) => {
            store.seriesArray = result.data.results;
            console.log("series", store.seriesArray);
            this.hasPerformedSearch = true; // Imposta a true dopo la ricerca
        })
        .catch((error) => {
            console.error("Errore nella chiamata API:", error);
        })
        .finally(() => {
            // Imposta lo stato di loading su false alla fine
            store.loading = false;
        });
    } else {
        console.log(
        "La stringa di ricerca è vuota dopo il trim, evito la chiamata API."
        );
        // Imposta lo stato di loading su false
        store.loading = false;
    }
    },

    getApiLoad() {
    store.loading = true;

    axios
      .get(store.apiUrlLoad, {})
      .then((result) => {
        store.moviesArray = result.data.results;
        console.log("series", store.loadArray);
        console.log("movies", store.moviesArray);
        this.hasPerformedSearch = true; // Imposta a true dopo la ricerca
      })
      .finally(() => {
        // Imposta lo stato di loading su false alla fine
        store.loading = false;
      });
    },

    handleMovieGenreChange() {
    // Aggiungi eventuali azioni necessarie quando cambia il genere dei film
    this.$emit('searchMovies');
  },
  handleTvGenreChange() {
    // Aggiungi eventuali azioni necessarie quando cambia il genere delle serie TV
    this.$emit('searchSeries');
  },

  handleMovieGenreChanged(newGenre) {
      this.selectedMovieGenre = newGenre;
    },
    handleTvGenreChanged(newGenre) {
      this.selectedTvGenre = newGenre;
    },

  },

  created() {
    this.getApiLoad();

    // Chiamata API per i generi dei film
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: "f2191c31fa927ebbbfd133d861d35f14",
        },
      })
      .then((response) => {
        store.movieGenres = response.data.genres;
      })
      .catch((error) => {
        console.error("Errore nella chiamata API:", error);
      });

    // Chiamata API per i generi delle serie TV
    axios
      .get("https://api.themoviedb.org/3/genre/tv/list", {
        params: {
          api_key: "f2191c31fa927ebbbfd133d861d35f14",
        },
      })
      .then((response) => {
        store.tvGenres = response.data.genres;
      })
      .catch((error) => {
        console.error("Errore nella chiamata API:", error);
      });
  },
mounted() {
    // Stampa i dati del cast nella console per ispezionarli
    console.log("Dati del cast:", this.cast);
  },
    
}
</script>

<template>

    <div class="bg-dark container-fluid p-2">

        <AppHeader @searchMovies="getApi" @searchSeries="getApiTV" @movieGenreChanged="handleMovieGenreChanged" @tvGenreChanged="handleTvGenreChanged"/>

        <AppMain :selectedMovieGenre="selectedMovieGenre" :selectedTvGenre="selectedTvGenre" class="bg-dark px-5 py-1"/>

    </div>


</template>

<style lang="scss">
@use "assets/scss/main" as *;
@import "assets/scss/partials/reset";
</style>