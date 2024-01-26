<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import {store} from './data/store';
import axios from 'axios'

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

    };
  },
  methods: {
    getApi() {
    const trimmedSearchInput = (store.searchInput || "").trim();
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
                    this.hasPerformedSearch = true;
                    console.log("Caricati film:", store.moviesArray);
                    this.filterContentByGenre();
                })
                .catch((error) => {
                    console.error("Errore nella chiamata API:", error);
                })
                .finally(() => {
                    store.loading = false;
                });
        } else {
            console.log(
                "La stringa di ricerca è vuota dopo il trim, evito la chiamata API."
            );
            store.loading = false;
        }
    } catch (error) {
        console.error("Errore durante l'esecuzione di getApi:", error);
    }
},

    getApiTV() {
    const trimmedSearchInput = (store.searchInput || "").trim();

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
            this.hasPerformedSearch = true; 
            this.filterContentByGenre();
        })
        .catch((error) => {
            console.error("Errore nella chiamata API:", error);
        })
        .finally(() => {
            store.loading = false;
        });
    } else {
        console.log(
        );
        store.loading = false;
    }
    },

    filterContentByGenre() {
    if (this.store.activeGenre) {
      this.store.filteredMovies = this.store.moviesArray.filter(movie =>
        movie.genre_ids.includes(this.store.activeGenre)
      );
      this.store.filteredSeries = this.store.seriesArray.filter(serie =>
        serie.genre_ids.includes(this.store.activeGenre)
      );
    } else {
      this.store.filteredMovies = this.store.moviesArray;
      this.store.filteredSeries = this.store.seriesArray;
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
        this.hasPerformedSearch = true;
        this.filterContentByGenre();
      })
      .finally(() => {
        store.loading = false;
      });
    },

  },

  created() {
    this.getApiLoad();

  },
mounted() {
    console.log("Dati del cast:", this.cast);
  },
  computed: {
    displayedMovies() {
      return this.store.activeGenre ? this.store.filteredMovies : this.store.moviesArray;
    },
    displayedSeries() {
      return this.store.activeGenre ? this.store.filteredSeries : this.store.seriesArray;
    },
}  
}
</script>

<template>

    <div class="bg-dark container-fluid p-2">

      <AppHeader @searchMovies="getApi" @searchSeries="getApiTV"/>

      <AppMain class="bg-dark px-5 py-1"/>

    </div>

</template>

<style lang="scss">
@use "assets/scss/main" as *;
@import "assets/scss/partials/reset";
</style>